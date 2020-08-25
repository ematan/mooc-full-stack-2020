import React from 'react'
import ReactDOM from 'react-dom'

const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

const App = () => {
  console.log('moi')
  const now = new Date()
  const a = 10
  const b = 20
  return (
    <div>
      <Hello />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
