
import { useState } from 'react'
import * as fs from 'fs'
const hostPath = 'C:/WINDOWS/system32/drivers/etc/hosts'
let vHostPath = 'C:/xampp/apache/conf/extra/httpd-vhosts.conf'

export const verifyVhost = ({ path = null }) => new Promise((resolve, reject) => {
  try {
    // modify default vhost
    vHostPath = path ? `${path}/apache/conf/extra/httpd-vhosts.conf` : vHostPath
    // check if vhost exists
    if (fs.existsSync(vHostPath) && fs.existsSync(hostPath)) {
      resolve()
    }
    reject(new Error('Host or VHost files do not exist make sure you installed all correctly!'))
  } catch (err) {
    console.log(err)
    reject(err)
  }
})

export const addEntries = ({ domain = null, suffix = null }) => new Promise((resolve, reject) => {
  console.log(!domain || !suffix)
  if (!domain || !suffix) {
    return reject(new Error('input info you dumb ass!'))
  }
  // create directory
  var dir = `C:/xampp/htdocs/${domain}/`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const data = `
  # virtual host entry for www.${domain}.${suffix}
  <VirtualHost *:80>
    DocumentRoot C:/xampp/htdocs/${domain}/
    ServerName www.${domain}.${suffix}
  </VirtualHost>
  <VirtualHost *:80>
      DocumentRoot C:/xampp/htdocs/${domain}/
      ServerName www.${domain}.${suffix}
  </VirtualHost>
  `
  const host = `
  127.0.0.1       www.${domain}.${suffix}
  127.0.0.1       ${domain}.${suffix}
  `

  fs.appendFile(hostPath, host, function (err) {
    if (err) reject(err)
  })

  fs.appendFile(vHostPath, data, function (err) {
    if (err) reject(err)
    return resolve('All done! restart XAMPP and enjoy!')
  })
})

export const useInput = (startingState = '') => {
  const [state, setState] = useState(startingState)

  const setInputs = (e) => setState({
    ...state,
    [e.target.name]: e.target.value
  })

  return [state, setInputs]
}
