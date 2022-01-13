import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ title }) => <h1>{title}</h1>

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
)

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const calcsAll = () => good + neutral + bad
  const calcsAverage = () => good / calcsAll() - bad / calcsAll()
  const calcsPositive = () => `${((good / calcsAll()) * 100).toFixed(2)}%`

  const statisticInfo = [
    {
      id: 1,
      name: 'good',
      value: good,
    },
    {
      id: 2,
      name: 'neutral',
      value: neutral,
    },
    {
      id: 3,
      name: 'bad',
      value: bad,
    },
    {
      id: 4,
      name: 'all',
      value: calcsAll(),
    },
    {
      id: 5,
      name: 'average',
      value: calcsAverage(),
    },
    {
      id: 6,
      name: 'positive',
      value: calcsPositive(),
    },
  ]

  return (
    <>
      <table>
        <tbody>
          {statisticInfo.map((item) => (
            <Statistic text={item.name} value={item.value} key={item.id} />
          ))}
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickPoints = (typePoint) => {
    if (typePoint === 'good') {
      setGood(good + 1)
    } else if (typePoint === 'neutral') {
      setNeutral(neutral + 1)
    } else if (typePoint === 'bad') {
      setBad(bad + 1)
    }
  }

  return (
    <>
      <Title title="give feedback" />
      <Button name="good" handleClick={() => handleClickPoints('good')} />
      <Button name="neutral" handleClick={() => handleClickPoints('neutral')} />
      <Button name="bad" handleClick={() => handleClickPoints('bad')} />
      <Title title="statistics" />
      {good > 0 || neutral > 0 || bad > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        'No feedback given'
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
