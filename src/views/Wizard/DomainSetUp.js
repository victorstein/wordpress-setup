import React from 'react'
import { Row, Col, Button, Input, Alert } from 'reactstrap'

const Domain = (props) => {
  return (
    <Row className='align-items-center'>
      <Col>
        <Input id='domain' type='text' className='w-100 mb-1' placeholder='Add domain' />
        <Input id='suffix' type='text' className='w-100 mb-3' placeholder='Add domain suffix' />
        <div className='d-flex flex-row'>
          <Button color='success' onClick={props.nextStep} block>ADD SITE</Button>
        </div>
        <Alert className='mt-4' color='primary'>
          It worked!
        </Alert>
      </Col>
      <Col>
        <h1 className='font-weight-bold'>DOMAIN INFO</h1>
        <p>Make your domain a virtual host!</p>
        <p className='mb-3'>
          This step will add the domain to the windows host file and to the virtual host file inside
          your XAMPP instalation, please avoid using *.dev domains since chrome has new policies preventing
          the development sites to load under that domain suffix.
        </p>
      </Col>
    </Row>
  )
}

export default Domain
