import React from 'react'
import { Row, Col, Button, Input, Alert, Progress, FormGroup, Label } from 'reactstrap'

const WordPress = (props) => {
  return (
    <Row className='align-items-center'>
      <Col>
        <FormGroup tag='fieldset'>
          <legend>Available themes</legend>
          <div className='d-flex flex-row'>
            <FormGroup className='mr-3' check>
              <Label check>
                <Input type='radio' name='radio1' />
                Impreza
              </Label>
            </FormGroup>
            <FormGroup className='mr-3' check>
              <Label check>
                <Input type='radio' name='radio1' />
                APress
              </Label>
            </FormGroup>
          </div>
        </FormGroup>
        <div className='mb-2'>
          <Progress value='25'>25%</Progress>
        </div>
        <Button color='success' onClick={props.nextStep} block>DOWNLOAD AND INSTALL</Button>
        <Alert className='mt-4' color='primary'>
          It worked!
        </Alert>
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
