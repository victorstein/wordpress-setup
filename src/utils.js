var fs = require('fs') // Load the File System to execute our common tasks (CRUD)
const hostPath = 'C:/WINDOWS/system32/drivers/etc/hosts'
const vHostPath = 'C:/xampp/apache/conf/extra/httpd-vhosts.conf'

export const verifyVhost = () => new Promise((resolve, reject) => {
  try {
    if (fs.existsSync(hostPath) && fs.existsSync(vHostPath)) {
      resolve('Host file and vHost file sexists')
    }
  } catch (err) {
    console.log(err)
    reject(new Error('Host or VHost files do not exist make sure you installed all correctly and restart the app!'))
  }
})

export const addEntries = (domain = null, suffix = null) => new Promise((resolve, reject) => {
  if (!domain || !suffix) {
    reject(new Error('input info you dumb ass!'))
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
    resolve('All done! restart XAMPP and enjoy!')
  })
})