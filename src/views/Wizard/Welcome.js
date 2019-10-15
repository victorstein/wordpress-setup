import React from 'react'
import { Row, Col, Button, Input, Alert } from 'reactstrap'

const Welcome = () => {
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
          <Input type='text' className='w-50 mr-4' placeholder='C:\xampp' />
          <Button color='success'>CHECK NOW</Button>
        </div>
        <Alert className='mt-4' color='primary'>
          It worked!
        </Alert>
      </Col>
    </Row>
  )
}

export default Welcome
