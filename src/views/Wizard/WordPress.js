import React, { useState, useContext } from 'react'
import { Row, Col, Button, Input, Alert, FormGroup, Label, Spinner } from 'reactstrap'
import uniqid from 'uniqid'
import { useInput } from '../../utils'
import { wizardStore } from '../setup'
import '../../assets/Themes/apress.zip'
import '../../assets/plugins/vc_clipboard.zip'
import '../../assets/plugins/apcore.zip'
import '../../assets/plugins/apress-importer.zip'
import '../../assets/plugins/js_composer.zip'
import '../../assets/plugins/revslider.zip'
import '../../assets/plugins/Ultimate_VC_Addons.zip'
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
    childProcess.execSync(`wp theme install "${remote.app.getAppPath()}/.webpack/renderer/assets/Themes/apress.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/vc_clipboard.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/apcore.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/apress-importer.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/js_composer.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/revslider.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    childProcess.execSync(`wp plugin install "${remote.app.getAppPath()}/.webpack/renderer/assets/plugins/Ultimate_VC_Addons.zip" --path=C:/xampp/htdocs/${query.domain} --activate`)
    resolve()
  })

  const download = async () => {
    try {
      // download wordpress
      setLoading(true)
      await downloadWorpress()
      setLoading(false)
      setAlert({ msg: 'WordPress installed successfully with the specified theme', color: 'success' })
      setTimeout(_ => props.nextStep(), 1000)
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
          </div>
        </FormGroup>
        <Button color='success' disabled={loading} onClick={download} block>
          {
            loading
              ? <Spinner color='light' />
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
          we will take care of all the set up, you just need to add a databaseand do the 5 minutes ordpress install!
        </p>
      </Col>
    </Row>
  )
}

export default WordPress
