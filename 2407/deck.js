const g = document.getElementById.bind(document)

document.addEventListener('keydown', event => {
  if (event.key === 'd') document.body.classList.toggle('deck')
})

g('deck-mode').addEventListener('click', () => document.body.classList.toggle('deck'))
