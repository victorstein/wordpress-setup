import React, { useState } from 'react'
import { Row, Col, Button, Input, Alert, Spinner } from 'reactstrap'
import { verifyVhost, useInput } from '../../utils'

const Welcome = (props) => {
  const [alert, setAlert] = useState({ msg: null, color: null })
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useInput()

  const checkXamp = () => {
    try {
      setLoading(true)
      setTimeout(async () => {
        await verifyVhost(input)
        setAlert({ msg: 'Success! If we need to set up your environment we will restart the app.', color: 'success' })
        setTimeout(_ => props.nextStep(), 1000)
        setLoading(false)
      }, 500)
    } catch (e) {
      console.log(e)
      setAlert({ msg: e.message, color: 'danger' })
      setLoading(false)
    }
  }

  return (
    <Row className='align-items-center'>
      <Col>
        <img src={require('../../assets/img/wp.png')} className='img-fluid' alt='importer' />
      </Col>
      <Col>
        <h1 className='font-weight-bold'>WELCOME</h1>
        <p>Welcome to the WordPress enviroment setup wizzard!</p>
        <p className='mb-3'>This wizzard will guide you through all the steps necessary to get up and running with your WordPress
          development environment. Make sure you have XAMPP installed before you proceed. <span className='text-danger font-weight-bold'>there is NO need to open or starting XAMPP! </span>
           We will do it for you. We will also check if you have the wp-cli and PHP enviroment setup properly, if not.... Dont Worry! we'll do it for you automagically!
            To get started please add the path to your XAMPP installation:
        </p>
        <div className='d-flex flex-row'>
          <Input onChange={setInput} type='text' className='w-50 mr-4' name='path' placeholder='C:/xampp' />
          <Button disabled={loading} color='success' onClick={checkXamp}>{loading ? <><Spinner size='sm' color='light' /> STARTING XAMPP</> : 'CHECK NOW'}</Button>
        </div>
        {
          alert.msg
            ? <Alert className='mt-4' color={alert.color}>
              {alert.msg}
            </Alert>
            : null
        }
      </Col>
    </Row>
  )
}

export default Welcome
