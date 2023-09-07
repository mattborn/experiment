/*

THIS WORKS BUT SWITCHING TO LOCALSTORAGE CACHING

const fs = require('fs')

const cacheFetch = async url => {
  const filePath = `.cache/${url.replace(/[^a-zA-Z0-9]/g, '-')}.html`
  if (fs.existsSync(filePath)) {
    console.log(`Using ${filePath}`)
    return fs.readFileSync(filePath, 'utf8')
  } else {
    const response = await fetch(url)
    const text = await response.text()
    fs.writeFileSync(filePath, text, 'utf8')
    return text
  }
}

const scrape = async pages => {
  const text = await cacheFetch('https://www.cleanenergyfuels.com/about-us/press-room')
  const parser = new DOMParser()
  const html = parser.parseFromString(text, 'text/html')

  const allLinks = Array.from(html.querySelectorAll('a'))
  console.log(allLinks.length, allLinks)
}

scrape() */
