import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'

// Lazy imports
const Setup = lazy(() => import('./views/setup'))

function App () {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path='/' exact component={Setup} />
        </Suspense>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
