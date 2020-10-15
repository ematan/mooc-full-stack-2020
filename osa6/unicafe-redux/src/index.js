import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const dispatchButton = (type) => {
    return () => store.dispatch({ type: type })
  }

  return (
    <div>
      <button onClick={dispatchButton('GOOD')}>good</button>
      <button onClick={dispatchButton('OK')}>neutral</button>
      <button onClick={dispatchButton('BAD')}>bad</button>
      <button onClick={dispatchButton('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
