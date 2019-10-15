import React from 'react'
import StepWizard from 'react-step-wizard'
import Welcome from './Wizard/Welcome'
const Setup = () => {
  return (
    <StepWizard>
      <Welcome />
    </StepWizard>
  )
}

export default Setup
