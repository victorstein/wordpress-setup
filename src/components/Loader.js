import React from 'react'
import { Spinner, Container, Row, Col } from 'reactstrap'

const Loader = () => {
  return (
    <Container className='vh-100'>
      <Row className='h-100'>
        <Col className='d-flex justify-content-center align-items-center'>
          <Spinner style={{ width: '10rem', height: '10rem' }} type='grow' color='info' />
        </Col>
      </Row>
    </Container>
  )
}

export default Loader
