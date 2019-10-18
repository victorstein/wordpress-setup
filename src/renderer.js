import '@babel/polyfill'
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'
import Loader from './components/Loader'

// Lazy imports
const Setup = lazy(() => import('./views/setup'))

function App () {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route path='/' exact component={Setup} />
        </Suspense>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
