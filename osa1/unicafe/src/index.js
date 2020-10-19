import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
    {text}
    </button>
  )
}

const StatisticLine = ({text, value, unit}) => (
  <tr><td>{text}</td><td>{value} {unit}</td></tr>
)

const Statistics = (props) => {
  const {good, neutral, bad} = props.values
  const total = good + bad + neutral
  const avg = (good - bad) / total
  const posit = good / total * 100

  return (
      <div>
        <h1>Statistic</h1>
        <div>
          {total===0
          ? <div>No feedback received</div>
          :	<table><tbody>
              <StatisticLine text='good' value={good} />
              <StatisticLine text='neutral' value={neutral} />
              <StatisticLine text='bad' value={bad} />
              <StatisticLine text='average' value={avg} />
              <StatisticLine text='positive' value={posit} unit='%'/>
            </tbody></table>
          }
        </div>
      </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increase = (value, func) => func(value)
  const values = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
    <h1>give feedback</h1>
    <Button
      handleClick={() => increase(good + 1, setGood)}
      text='good'
    />
    <Button handleClick={() => increase(neutral + 1, setNeutral)}
      text='neutral'
    />
    <Button
      handleClick={() => increase(bad + 1, setBad)}
      text='bad'
    />

    <Statistics values={values} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
