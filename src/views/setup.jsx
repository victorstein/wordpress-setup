import React from 'react'
import StepWizard from 'react-step-wizard'
import Welcome from './Wizard/Welcome'
import DomainSetUp from './Wizard/DomainSetUp'
import WordPress from './Wizard/WordPress'
import { Container } from 'reactstrap'

const Setup = (props) => {
  return (
    <Container className='vh-100 d-flex align-items-center px-4' fluid>
      <StepWizard>
        <Welcome />
        <DomainSetUp />
        <WordPress />
      </StepWizard>
    </Container>
  )
}

export default Setup
