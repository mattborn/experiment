const g = document.getElementById.bind(document)

const insert = (target = document.body, tag = 'div') => {
  const el = document.createElement(tag)
  target.appendChild(el)
  return el
}

fetch('ndex.json')
  .then(response => response.json())
  .then(experiments => {
    experiments.forEach(experiment => {
      if (experiment.hide) return

      const item = insert(g('experiments'))
      item.className = 'experiment'

      const week = insert(item, 'small')
      week.textContent = experiment.week

      const name = insert(item, 'h2')
      name.textContent = experiment.name || 'Untitled'

      const wrap = insert(item)

      const a = insert(wrap, 'a')
      a.href = (location.host === 'mattborn.com' ? '/experiment/' : '/') + experiment.week
      a.textContent = 'Look'
    })
  })
  .catch(console.error)
