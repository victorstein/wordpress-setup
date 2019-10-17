import React from 'react'
import { Row, Col, Button, Input, Alert } from 'reactstrap'

function Database (props) {
  return (
    <Row className='align-items-center'>
      <Col>
        <Input name='host' type='text' className='w-100 mb-1' placeholder='Host (Localhost)' />
        <Input name='dbName' type='text' className='w-100 mb-1' placeholder='Database name' />
        <Input name='databaseUser' type='text' className='w-100 mb-1' placeholder='Database user (root)' />
        <Input name='userPassword' type='text' className='w-100 mb-2' placeholder='User Password ()' />
        <Button color='success' className='w-100 mb-3' block>CREATE DATABASE</Button>
        <Alert color='info'>Success or error message</Alert>
      </Col>
      <Col>
        <h1 className='font-weight-bold'>DATABASE CREATION</h1>
        <p className='mb-3'>
          This step will create a database for your wordpress installation, please specify your host, database name, database user
          and password to create the entries. you can leave database user and pasword empty and we will use XAMPP's defaults (root, no pass).
          if you leave the host empty we will use localhost by default.
        </p>
      </Col>
    </Row>
  )
}

export default Database
