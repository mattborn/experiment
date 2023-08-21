export function getVersions(fetch) {
  console.log('Getting versions…')
  const headers = { 'X-Figma-Token': 'figd_j3lBCDOlo3PUyNXJ4nC81iLP2PdvQUZss3yGscIt' }
  const teamIds = ['962740887303593902', '949322428428075800']

  return new Promise(async resolve => {
    const reportData = []
    let requestCount = 0

    try {
      for (const teamId of teamIds) {
        requestCount++
        const projectsResponse = await fetch(`https://api.figma.com/v1/teams/${teamId}/projects`, { headers })
        const projectsData = await projectsResponse.json()

        for (const project of projectsData.projects) {
          requestCount++
          const filesResponse = await fetch(`https://api.figma.com/v1/projects/${project.id}/files`, { headers })
          const filesData = await filesResponse.json()

          for (const file of filesData.files) {
            requestCount++
            console.log(`Requests so far: ${requestCount}`)
            const versionsResponse = await fetch(`https://api.figma.com/v1/files/${file.key}/versions`, { headers })
            const versionsData = await versionsResponse.json()

            for (const version of versionsData.versions) {
              reportData.push({
                team: projectsData.name,
                project: project.name,
                file: file.name,
                version: version.id,
                timestamp: version.created_at,
                editor: version.user.handle,
              })
            }
          }
        }
      }
      console.log(`Total requests made: ${requestCount}`)
      resolve(reportData)
    } catch (error) {
      console.error('Error generating report:', error)
    }
  })
}
