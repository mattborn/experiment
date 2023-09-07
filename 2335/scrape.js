const g = document.getElementById.bind(document)

const data = [['Date', 'Customer', 'Deal Type', 'Volume', 'Page Title']]

const hot = new Handsontable(document.getElementById('hot'), {
  colHeaders: true,
  data: data,
  licenseKey: 'non-commercial-and-evaluation',
  persistentState: true,
})

// use indexedDB for caching
// why? pages were too big for localStorage
// and fetch doesn’t work with file system

let cacheCount = 0

let db
const dbPromise = new Promise((resolve, reject) => {
  const openRequest = indexedDB.open('scrape', 1)

  openRequest.onupgradeneeded = event => {
    db = event.target.result
    db.createObjectStore('pages', { keyPath: 'url' })
  }

  openRequest.onsuccess = event => {
    db = event.target.result
    resolve()
  }

  openRequest.onerror = event => reject('Error opening IndexedDB')
})

const cachePage = async (url, content) => {
  const tx = db.transaction('pages', 'readwrite')
  const store = tx.objectStore('pages')
  store.put({ url, content })
}

const loadCachedPage = url =>
  new Promise(resolve => {
    const tx = db.transaction('pages', 'readonly')
    const store = tx.objectStore('pages')
    const getRequest = store.get(url)
    getRequest.onsuccess = () => resolve(getRequest.result?.content || null)
  })

const loadFetch = async url => {
  let cachedData = await loadCachedPage(url)

  if (cachedData) {
    // console.log(`Reading ${url} from cache`)
    cacheCount++
    return cachedData
  } else {
    try {
      console.log(`Fetching ${url}`)
      const response = await fetch(url)
      if (!response.ok) {
        console.warn(`Failed fetching ${url}, status: ${response.status}`)
        await cachePage(url, 'failed')
        return 'failed'
      }
      const text = await response.text()
      await cachePage(url, text)
      return text
    } catch (err) {
      console.warn(`Error fetching ${url}: ${err}`)
      await cachePage(url, 'failed')
      return 'failed'
    }
  }
}

;(async () => {
  await dbPromise
  let allLinks = []

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const gatherLinks = async url => {
    const text = await loadFetch(url)
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')

    // specific to cleanenergyfuels.com
    const links = Array.from(doc.querySelectorAll('.entry-title a')).map(a => a.href)
    allLinks.push(...links)
  }

  // loop through each index page to gather links
  for (let i = 0; i < 14; i++) {
    const append = i ? `/page/${i + 1}` : ''
    await gatherLinks(`https://www.cleanenergyfuels.com/about-us/press-room${append}`)
  }

  for (const [index, link] of allLinks.entries()) {
    if (index < 0 || index > 8) continue // skip if outside the range

    const text = await loadFetch(link)

    // skip current iteration if fetch failed
    if (text === 'failed') {
      console.warn(`Skipping failed link: ${link}`)
      continue
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')

    const content = doc.querySelector('.entry-content')
    if (content) {
      try {
        console.log('Sending content to OpenAI:', link)
        await turbo(content.textContent).then(text => {
          const json = toJSON(text)
          json.deals.forEach(deal => {
            const row = []
            row.push(deal.date)
            row.push(deal.company_name)
            row.push(deal.deal_type)
            row.push(deal.volume)
            row.push(doc.querySelector('h1').textContent)
            data.push(row)
          })
          hot.updateData(data)
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  console.log(`${cacheCount} links read from cache`)
})()

// copied from earlier AI project

const turbo = async content => {
  // console.log('Fetching data…', content)
  const response = await fetch(`https://us-central1-samantha-374622.cloudfunctions.net/turbo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        role: 'system',
        content: `Convert unstructured text into consistent JSON`,
      },
      {
        role: 'user',
        content: `Find each mention of a deal with a customer, energy volume, and type of deal then return that list as a single JSON object copying this schema: ${JSON.stringify(
          {
            deals: [
              {
                company_name: 'Company Name',
                date: 'use the date of the post',
                deal_type: 'type of deal described',
                volume: '200,000 gallons of RNG',
              },
            ],
          },
        )} using the values as hints while ignoring Clean Energy Fuels in the results. Here is the content: ${content}.`,
      },
    ]),
  })
  return response.text()
}

const toJSON = str => {
  const curly = str.indexOf('{')
  const square = str.indexOf('[')
  let first
  if (curly < 0) first = '[' // only for empty arrays
  else if (square < 0) first = '{'
  else first = curly < square ? '{' : '['
  const last = first === '{' ? '}' : ']'
  // ensure JSON is complete
  let count = 0
  for (const c of str) {
    if (c === '{' || c === '[') count++
    else if (c === '}' || c === ']') count--
  }
  if (!count) return JSON.parse(str.slice(str.indexOf(first), str.lastIndexOf(last) + 1))
}
