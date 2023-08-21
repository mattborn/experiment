import { getVersions } from './getVersions.js'

const headers = { 'X-Figma-Token': 'figd_j3lBCDOlo3PUyNXJ4nC81iLP2PdvQUZss3yGscIt' }

const teamPromises = ['962740887303593902', '949322428428075800'].map(teamId =>
  fetch(`https://api.figma.com/v1/teams/${teamId}/projects`, { headers }).then(response => response.json()),
)
Promise.all(teamPromises)
  .then(teams => {
    console.log(teams)
  })
  .catch(console.error)

document.getElementById('update').addEventListener('click', e => {
  getVersions(fetch).then(reportData => {
    fetch('https://sheetdb.io/api/v1/vhqvcf6m7wc16', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: reportData }),
    })
      .then(response => response.json())
      .then(console.log)
      .catch(console.error)
  })
})
