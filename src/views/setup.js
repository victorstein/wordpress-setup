import React from 'react'
import StepWizard from 'react-step-wizard'
import Welcome from './wizard/Welcome'
import { Container } from 'reactstrap'

const Setup = () => {
  return (
    <Container className='vh-100 d-flex align-items-center px-4' fluid>
      <StepWizard>
        <Welcome />
      </StepWizard>
    </Container>
  )
}

export default Setup
