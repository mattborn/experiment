const g = document.getElementById.bind(document)

//github.com/markedjs/marked/releases/tag/v5.0.1
marked.use({
  headerIds: false,
  mangle: false,
})

fetch('./readme.md')
  .then(response => response.text())
  .then(text => (g('readme').innerHTML = marked.parse(text)))
