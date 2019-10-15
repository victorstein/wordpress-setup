import React from 'react'
import { Row, Col, Button } from 'reactstrap'

const Welcome = () => {
  return (
    <Row>
      <Col>
        <img src={require('../../assets/img/wp.png')} className='img-fluid' alt='importer' />
      </Col>
      <Col>
        <h1>welcome</h1>
      </Col>
    </Row>
  )
}

export default Welcome
