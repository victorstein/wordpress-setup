import React, { createContext, useState } from 'react'
import StepWizard from 'react-step-wizard'
import Welcome from './Wizard/Welcome'
import DomainSetUp from './Wizard/DomainSetUp'
import WordPress from './Wizard/WordPress'
import Finish from './Wizard/Finish'
import Database from './Wizard/Database'
import { Container } from 'reactstrap'

export const wizardStore = createContext()

const Setup = (props) => {
  const [state, setState] = useState({
    domain: null,
    suffix: null
  })

  return (
    <Container className='vh-100 d-flex align-items-center px-4' fluid>
      <wizardStore.Provider value={{
        query: state,
        mutation: {
          setDomain: (domain) => setState({ ...state, domain }),
          setSuffix: (suffix) => setState({ ...state, suffix })
        }
      }}>
        <StepWizard>
          <Welcome />
          <Database />
          <DomainSetUp />
          <WordPress />
          <Finish />
        </StepWizard>
      </wizardStore.Provider>
    </Container>
  )
}

export default Setup
