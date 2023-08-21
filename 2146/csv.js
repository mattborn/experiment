import fetch from 'node-fetch'
import fs from 'fs'
import Papa from 'papaparse'

import { getVersions } from './getVersions.js'

getVersions(fetch).then(reportData => {
  const csv = Papa.unparse(reportData)
  fs.writeFileSync('versions.csv', csv)
})
