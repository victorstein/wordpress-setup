import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

console.log('👋 This message is being logged by "renderer.js", included via webpack');

function App () {
  return <div>1234</div>
}

ReactDOM.render(<App />, document.getElementById('root'));