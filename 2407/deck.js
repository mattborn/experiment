const g = document.getElementById.bind(document)

document.addEventListener('keydown', event => {
  if (event.key === 's') document.body.classList.toggle('deck')
  if (event.key === 'd') document.body.classList.toggle('dark')
})

g('deck-mode').addEventListener('click', () => document.body.classList.toggle('deck'))
g('dark-mode').addEventListener('click', () => document.body.classList.toggle('dark'))

window.addEventListener('scroll', () => {
  const start = g('parallax').offsetTop - window.innerHeight / 2
  const y = window.scrollY - start

  const p1_offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--p1-offset'), 10)
  const p2_offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--p2-offset'), 10)

  g('portfolio-1').style.transform = `translateX(${p1_offset - y / 4}px)`
  g('portfolio-2').style.transform = `translateX(${p2_offset + y / 4}px)`
})
