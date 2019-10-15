import React, { useState } from 'react'
import { Row, Col, Button, Input, Alert } from 'reactstrap'
import { useInput, addEntries } from '../../utils'

const Domain = (props) => {
  const [alert, setAlert] = useState({
    msg: null,
    color: null
  })
  const [inputs, setInputs] = useInput()

  console.log(inputs)

  const addDomain = async () => {
    try {
      await addEntries(inputs)
      setAlert({ msg: 'Paths to new domain added successfully', color: 'success' })
      setTimeout(_ => props.nextStep(), 1000)
    } catch (e) {
      console.log(e)
      setAlert({ msg: e.message, color: 'danger' })
    }
  }

  return (
    <Row className='align-items-center'>
      <Col>
        <Input name='domain' onChange={setInputs} type='text' className='w-100 mb-1' placeholder='Add domain' />
        <Input name='suffix' onChange={setInputs} type='text' className='w-100 mb-3' placeholder='Add domain suffix' />
        <div className='d-flex flex-row'>
          <Button color='success' onClick={addDomain} block>ADD SITE</Button>
        </div>
        {
          alert.msg
            ? <Alert className='mt-4' color={alert.color}>
              { alert.msg }
            </Alert>
            : null
        }
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
