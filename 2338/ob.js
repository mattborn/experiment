const g = document.getElementById.bind(document)

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGJvcm4iLCJhIjoiY2w1Ym0wbHZwMDh3eTNlbnh1aW51cm0ydyJ9.Z5h4Vkk8zqjf6JydrOGXGA'
const map = new mapboxgl.Map({
  center: [-87.59, 30.28],
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 13,
})

map.on('load', () => {
  map.removeLayer('poi-label')
  map.removeLayer('settlement-subdivision-label')
  map.removeLayer('road-label')
  map.removeLayer('landuse')
  // map.setLayoutProperty('water', 'visibility', 'none')
})
