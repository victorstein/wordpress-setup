import React, { useState, useContext } from 'react'
import { Row, Col, Button, Input, Alert, FormGroup, Label, Spinner } from 'reactstrap'
import uniqid from 'uniqid'
import { useInput } from '../../utils'
import { wizardStore } from '../setup'
import { remote } from 'electron'
const childProcess = require('child_process')

const WordPress = (props) => {
  const [alert, setAlert] = useState({
    msg: null,
    color: null
  })
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useInput({ theme: 'apress' })
  const { query } = useContext(wizardStore)
  console.log(query)

  const downloadWorpress = () => new Promise((resolve, reject) => {
    childProcess.execSync(`wp core download --path=C:/xampp/htdocs/${query.domain}`)
    childProcess.execSync(`wp config create --path=C:/xampp/htdocs/${query.domain} --dbname=${query.dbName} --dbuser=${query.dbUser} --dbpass=${query.dbPass} --dbhost=localhost --locale=en_US --dbprefix=${uniqid().substring(0, 4)}_ --skip-check`)
    childProcess.execSync(`wp core install --path=C:/xampp/htdocs/${query.domain} --url=${query.domain}.${query.suffix} --title=${query.domain} --admin_user=${query.WPUser} --admin_password=${query.WPPass} --admin_email=${query.WPEmail}`)
    resolve()
  })

  const themeInstall = (theme) => {
    switch (theme) {
      case 'apress':
        return installApress()
      case 'total':
        return installTotal()
      case 'xtra':
        return installXtra()
      default:
        return installApress()
    }
  }

  const installApress = () => new Promise((resolve, reject) => {
    childProcess.execSync(`wp theme install "${remote.app.getAppPath()}/.webpack/renderer/assets/Themes/apress.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/vc_clipboard.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/apress/apcore.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/apress/apress-importer.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/apress/js_composer.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/apress/revslider.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/apress/Ultimate_VC_Addons.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "contact-form-7" --path=C:/xampp/htdocs/${query.domain} --activate`)
    resolve()
  })

  const installTotal = () => new Promise((resolve, reject) => {
    childProcess.execSync(`wp theme install "${remote.app.getAppPath()}/.webpack/renderer/assets/Themes/total.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/vc_clipboard.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/total/LayerSlider.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/total/templatera.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/total/js_composer.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/total/revslider.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/total/total-theme-core.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "contact-form-7" --path=C:/xampp/htdocs/${query.domain} --activate`)
    resolve()
  })

  const installXtra = () => new Promise((resolve, reject) => {
    childProcess.execSync(`wp theme install "${remote.app.getAppPath()}/.webpack/renderer/assets/Themes/xtra.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/vc_clipboard.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/xtra/codevz-plus.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "contact-form-7" --path=C:/xampp/htdocs/${query.domain} --activate`)
    resolve()
  })

  const restartXAMPP = () => {
    childProcess.execSync('C:\\xampp\\xampp_stop.exe')
    childProcess.execSync('C:\\xampp\\xampp_start.exe')
  }

  const download = (theme) => {
    try {
      setLoading(true)
      setTimeout(async () => {
        await downloadWorpress()
        themeInstall(theme)
        restartXAMPP()
        setLoading(false)
        setAlert({ msg: 'WordPress installed successfully with the specified theme', color: 'success' })
        setTimeout(_ => props.nextStep(), 1000)
      }, 500)
    } catch (e) {
      console.log(e)
      setAlert({ msg: e.message, color: 'danger' })
    }
  }

  return (
    <Row className='align-items-center'>
      <Col>
        <FormGroup tag='fieldset'>
          <legend>Available themes</legend>
          <div className='d-flex flex-row'>
            <FormGroup className='mr-3' check>
              <Label check>
                <Input checked={inputs.theme === 'apress'} type='radio' onChange={setInputs} name='theme' value='apress' />
                APress
              </Label>
            </FormGroup>
            <FormGroup className='mr-3' check>
              <Label check>
                <Input checked={inputs.theme === 'total'} type='radio' onChange={setInputs} name='theme' value='total' />
                Total
              </Label>
            </FormGroup>
            <FormGroup className='mr-3' check>
              <Label check>
                <Input checked={inputs.theme === 'xtra'} type='radio' onChange={setInputs} name='theme' value='xtra' />
                Xtra
              </Label>
            </FormGroup>
          </div>
        </FormGroup>
        <Button color='success' disabled={loading} onClick={() => download(inputs.theme)} block>
          {
            loading
              ? <><Spinner size='sm' color='light' /> INSTALLING WORDPRESS</>
              : 'DOWNLOAD AND INSTALL'
          }
        </Button>
        {
          alert.msg
            ? <Alert className='mt-4' color={alert.color}>
              {alert.msg}
              </Alert>
            : null
        }
      </Col>
      <Col>
        <h1 className='font-weight-bold'>INSTALL WORDPRESS</h1>
        <p>Get all tidy and set up!</p>
        <p className='mb-3'>
          We will install the latest version of WordPress and you can pick between one of the available themes to install,
          we will take care of all the set up, Theme and plugins! we will also stop and re-start the XAMPP instance to refresh the
          system with the new virtual host created!
        </p>
        <p className='font-weight-bold text-danger'>This process DOES take a while, please be patient!</p>
      </Col>
    </Row>
  )
}

export default WordPress
