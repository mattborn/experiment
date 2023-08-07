const g = document.getElementById.bind(document)

dayjs.extend(dayjs_plugin_isoWeek)
dayjs.extend(dayjs_plugin_quarterOfYear)
dayjs.extend(dayjs_plugin_isLeapYear)

const today = dayjs()
const thisWeekday = today.isoWeekday()
const thisWeek = today.isoWeek()
const padWeek = String(thisWeek).padStart(2, '0')
const thisQuarter = today.quarter()
const thisYear = today.year()

const formatYearWeek = (year, week) => {
  return String(year).slice(-2) + String(week).padStart(2, '0')
}

const currentWeek = formatYearWeek(dayjs().year(), dayjs().isoWeek())

// shorthand
g('short').textContent = `Week ${currentWeek}`
// extended format
g('iso-e').textContent = `${thisYear}-W${padWeek}-${thisWeekday}`
// compact format
g('iso-c').textContent = `${thisYear}W${padWeek}${thisWeekday}`
// current quarter
g('quarter').textContent = `Q${thisQuarter}`
// remaining this quarter
g('rem-q').textContent = `${today.endOf('quarter').diff(today, 'week')} weeks`
// remaining this year
g('rem-y').textContent = `${today.endOf('year').diff(today, 'week')} weeks`

const getWeeks = year =>
  Array.from({ length: dayjs(`${year}-12-31`).isoWeek() }, (_, i) => {
    i = i + 1
    return {
      quarter: Math.ceil(i / 13),
      quarterStart: !((i - 1) % 13),
      starts: dayjs().year(year).isoWeek(i).startOf('isoWeek').format('MMM D'),
      week: formatYearWeek(year, i),
      when: i < thisWeek ? 'past' : i === thisWeek ? 'present' : 'future',
    }
  })

const insert = (target = document.body, tag = 'div') => {
  const el = document.createElement(tag)
  target.appendChild(el)
  return el
}

getWeeks(thisYear).forEach(w => {
  const group = insert(g('weeks'))
  group.className = ['week', w.when, w.quarterStart && 'quarter'].filter(Boolean).join(' ')

  const week = insert(group, 'b')
  week.className = 'week-id'
  week.textContent = w.week

  const starts = insert(group)
  starts.textContent = w.starts
})

//github.com/markedjs/marked/releases/tag/v5.0.1
marked.use({
  headerIds: false,
  mangle: false,
})

fetch('./readme.md')
  .then(response => response.text())
  .then(text => (g('readme').innerHTML = marked.parse(text)))
