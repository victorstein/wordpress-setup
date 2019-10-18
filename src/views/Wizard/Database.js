import React, { useContext, useState } from 'react'
import { Row, Col, Button, Input, Alert, Spinner } from 'reactstrap'
import mysql from 'mysql'
import { useInput } from '../../utils'
import { wizardStore } from '../setup'

function Database (props) {
  const [inputs, setInputs] = useInput()
  const { query, mutation } = useContext(wizardStore)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ msg: null, color: null })

  const createDatabase = () => {
    setLoading(true)
    mutation.setData({
      dbName: inputs.dbName || query.domain,
      dbUser: inputs.databaseUser || 'root',
      dbPass: inputs.userPassword || '',
      dbHost: inputs.host || 'localhost'
    })

    let con = mysql.createConnection({
      host: inputs.host || 'localhost',
      user: inputs.databaseUser || 'root',
      password: inputs.userPassword || ''
    })

    con.connect((err) => {
      if (err) {
        console.log(err)
        setLoading(false)
        setAlert({ msg: err.message, color: 'danger' })
        return
      }
      con.query(`CREATE DATABASE ${inputs.dbName || query.domain}`, (err, result) => {
        if (err) {
          console.log(err)
          setLoading(false)
          setAlert({ msg: err.message, color: 'danger' })
          return
        }
        setLoading(false)
        setAlert({ msg: 'Database created', color: 'success' })
        setTimeout(_ => props.nextStep(), 1000)
      })
    })
  }

  return (
    <Row className='align-items-center'>
      <Col>
        <Input name='host' onChange={setInputs} type='text' className='w-100 mb-1' placeholder='Host (Localhost)' />
        <Input name='dbName' onChange={setInputs} type='text' className='w-100 mb-1' placeholder='Database name' />
        <Input name='databaseUser' onChange={setInputs} type='text' className='w-100 mb-1' placeholder='Database user (root)' />
        <Input name='userPassword' onChange={setInputs} type='text' className='w-100 mb-2' placeholder='User Password ()' />
        <Button color='success' onClick={createDatabase} disabled={loading} className='w-100 mb-3' block>
          {
            loading
              ? <Spinner color='light' />
              : 'CREATE DATABASE'
          }
        </Button>
        {
          alert.msg
            ? <Alert color={alert.color}>{ alert.msg }</Alert>
            : null
        }
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
