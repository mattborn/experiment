const fs = require('fs')
const path = require('path')

const root = './'

const experiments = JSON.parse(fs.readFileSync('ndex.json', 'utf8'))

fs.readdirSync(root).forEach(folder => {
  if (folder.startsWith('.')) return
  if (fs.statSync(path.join(root, folder)).isDirectory()) {
    if (!experiments.some(p => p.week === folder)) {
      experiments.push({ week: folder })
    }
  }
})

fs.writeFileSync('ndex.json', JSON.stringify(experiments, null, 2))
