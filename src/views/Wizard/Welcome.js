import React, { useState } from 'react'
import { Row, Col, Button, Input, Alert } from 'reactstrap'
import { verifyVhost, useInput } from '../../utils'

const Welcome = (props) => {
  const [alert, setAlert] = useState({ msg: null, color: null })
  const [input, setInput] = useInput()

  const checkXamp = async () => {
    try {
      await verifyVhost(input)
      setAlert({ msg: 'Host file and vHost file sexists', color: 'success' })
      setTimeout(_ => props.nextStep(), 1000)
    } catch (e) {
      console.log(e)
      setAlert({ msg: e.message, color: 'danger' })
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
          development environment. Make sure you have XAMPP installed before you proceed, To get started please add the
          path to your XAMPP installation:
        </p>
        <div className='d-flex flex-row'>
          <Input onChange={setInput} type='text' className='w-50 mr-4' name='path' placeholder='C:/xampp' />
          <Button color='success' onClick={checkXamp}>CHECK NOW</Button>
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
