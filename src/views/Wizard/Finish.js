import React, { useContext, useState } from 'react'
import { Row, Col, Button, Spinner } from 'reactstrap'
import { wizardStore } from '../setup'
const childProcess = require('child_process')

function Finish (props) {
  const [loading, setLoading] = useState(false)
  const { query } = useContext(wizardStore)

  const goToSite = () => {
    childProcess.execSync(`start http://www.${query.domain}.${query.suffix}`)
  }

  const finished = () => {
    setLoading(true)
    setTimeout(() => {
      childProcess.execSync('C:\\xampp\\xampp_stop.exe')
      setLoading(false)
      props.firstStep()
    }, 500)
  }

  return (
    <Row className='align-items-center'>
      <Col>
        <h1 className='text-center'>Installation complete!</h1>
        <p className='text-center'>Your site is installed with the theme you specified and all its required plugins! oh!
         we also added the Visual Composer clipboard plugin for Your convenience!
        </p>
        <p className='text-success font-weight-bold'>We are running a XAMPP Apache instance to run the site. you can keep this screen to work with this XAMPP instance or
          click the "ADD A NEW DEVELOPMENT SITE" button to stop the current XAMPP instance and start the new site wizard.
        </p>
        <p className='text-center'>
          <Button color='success' onClick={() => goToSite()}>Go to www.{query.domain}.{query.suffix}</Button>
        </p>
        <h3 className='text-center'>Here is the most relevant information</h3>
        <Row>
          {
            Object.entries(query).map(u => (
              <Col md='4' sm='4' lg='4' xl='4' key={u[0]} className='mx-auto text-center'>
                <strong>{u[0]}: </strong>
                <p>{u[1]}</p>
              </Col>
            ))
          }
        </Row>
        <div className='d-flex align-items-center justify-content-center'>
          <Button className='text-center' disabled={loading} color='success' onClick={() => finished()}>{loading ? <><Spinner size='sm' color='light' /> STOPPING XAMPP...</> : 'ADD A NEW DEVELOPMENT SITE'}</Button>
        </div>
      </Col>
    </Row>
  )
}

export default Finish
