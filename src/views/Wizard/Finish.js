import React, { useContext } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { wizardStore } from '../setup'

function Finish (props) {
  const { query } = useContext(wizardStore)

  return (
    <Row className='align-items-center'>
      <Col>
        <h1 className='text-center'>Installation complete!</h1>
        <p className='text-center'>Your site is installed with the theme you specified and the VC composer clipboard for Your
          convenience! you can now follow the 5 minutes WordPress Install to start
          designing your site.
        </p>
        <h3 className='text-center'>Here is the most relevant information</h3>
        {
          Object.entries(query).map(u => (
            <div key={u[0]} className='mx-auto text-center'>
              <strong>{ u[0] }: </strong>
              <p>{u[1]}</p>
            </div>
          ))
        }
        <div className='d-flex align-items-center justify-content-center'>
          <Button className='text-center' color='success' onClick={props.firstStep}>ADD A NEW DEVELOPMENT SITE</Button>
        </div>
      </Col>
    </Row>
  )
}

export default Finish
