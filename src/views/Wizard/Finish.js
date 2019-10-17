import React from 'react'
import { Row, Col, Button } from 'reactstrap'

function Finish (props) {
  return (
    <Row>
      <Col>
        <h1 className='text-center'>Installation complete!</h1>
        <p className='text-center'>Your site is installed with the theme you specified and the VC composer clipboard for Your
          convenience! you can now follow the 5 minutes WordPress Install to start
          designing your site.
        </p>
        <Button className='text-center' color='success' onClick={props.firstStep}>ADD A NEW DEVELOPMENT SITE</Button>
      </Col>
    </Row>
  )
}

export default Finish
