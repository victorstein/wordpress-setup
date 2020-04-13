
import { useState } from 'react'
import { remote } from 'electron'
import * as fs from 'fs'
const childProcess = require('child_process')
const hostPath = 'C:/WINDOWS/system32/drivers/etc/hosts'
let vHostPath = 'C:/xampp/apache/conf/extra/httpd-vhosts.conf'
const Shell = require('node-powershell')

const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true
})
const ps1 = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true
})

export const verifyVhost = ({ path = null }) => new Promise((resolve, reject) => {
  try {
    // modify default vhost
    vHostPath = path ? `${path}/apache/conf/extra/httpd-vhosts.conf` : vHostPath
    // check if vhost exists
    if (fs.existsSync(vHostPath) && fs.existsSync(hostPath)) {
      // verify ENV
      if (!verifyENV().foundWPCLI) {
        copyWPCLI()
        addENV()
        resolve()
      } else {
        childProcess.execSync(!path ? 'C:\\xampp\\xampp_start.exe' : `${path}\\xampp_start.exe`)
        resolve()
      }
    }
    reject(new Error('Host or VHost files do not exist make sure you installed all correctly!'))
  } catch (err) {
    console.log(err)
    reject(err)
  }
})

export const verifyENV = () => {
  const pathENV = childProcess.execSync('echo %Path%', { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }).toString()
  var result = pathENV.split(';')
  console.log(result)
  const foundPHP = result.find(x => x === 'C:\\xampp\\php')
  const foundWPCLI = result.find(x => x === 'C:\\wp-cli')
  console.log({ foundPHP, foundWPCLI })
  return { foundPHP, foundWPCLI }
}

export const copyWPCLI = () => {
  const batch = `${remote.app.getAppPath()}/.webpack/renderer/assets/wp-cli/wp.bat`
  const lib = `${remote.app.getAppPath()}/.webpack/renderer/assets/wp-cli/wp-cli.phar`
  var dir = 'C:\\wp-cli'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    fs.copyFileSync(batch, 'C:\\wp-cli\\wp.bat')
    fs.copyFileSync(lib, 'C:\\wp-cli\\wp-cli.phar')
    console.log('Created wp-cli folder and added files')
    return true
  }
  console.log('wp-cli folder already exists')
  return true
}

export const addENV = () => {
  ps.addCommand(`
    $new_entry = 'C:\\wp-cli'

  $old_path = [Environment]::GetEnvironmentVariable('path', 'user');
  $new_path = $old_path + ';' + $new_entry
  [Environment]::SetEnvironmentVariable('path', $new_path,'User');
  `)
  ps.invoke()
    .then(output => {
      ps1.addCommand(`
      $new_entry = 'C:\\xampp\\php'

    $old_path = [Environment]::GetEnvironmentVariable('path', 'user');
    $new_path = $old_path + ';' + $new_entry
    [Environment]::SetEnvironmentVariable('path', $new_path,'User');
    `)
      ps1.invoke()
        .then(output => {
          console.log(output, 'added variables to user')
          childProcess.execSync('C:\\xampp\\xampp_stop.exe')
          window.alert('Environment variables Added! Please open WordPress setup again.')
          remote.app.exit(0)
          return true
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
}

export const addEntries = ({ domain = null, suffix = null }) => new Promise((resolve, reject) => {
  try {
    if (!domain || !suffix) {
      return reject(new Error('input info you dumb ass!'))
    }
    // create directory
    var dir = `C:/xampp/htdocs/${domain}/`

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    } else {
      return reject(new Error('Domain already exists in your host files!'))
    }

    const data = `# virtual host entry for www.${domain}.${suffix}
  <VirtualHost *:80>
    DocumentRoot C:/xampp/htdocs/${domain}/
    ServerName www.${domain}.${suffix}
  </VirtualHost>
  <VirtualHost *:80>
      DocumentRoot C:/xampp/htdocs/${domain}/
      ServerName www.${domain}.${suffix}
  </VirtualHost>`
    const host = `# virtual host entry for www.${domain}.${suffix}
  127.0.0.1       www.${domain}.${suffix}
  127.0.0.1       ${domain}.${suffix}`

    fs.appendFileSync(hostPath, host)
    fs.appendFileSync(vHostPath, data)

    return resolve('All done! restart XAMPP and enjoy!')
  } catch (e) {
    console.log(e)
    reject(e)
  }
})

export const useInput = (startingState = '') => {
  const [state, setState] = useState(startingState)

  const setInputs = (e) => setState({
    ...state,
    [e.target.name]: e.target.value
  })

  return [state, setInputs]
}
