import { useState } from 'react'

const Display = ({text}) => {
  return <h1>{text}</h1>
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  if(value === 0 && text === true){
    return<tr><td>No feedback given</td></tr>
  }
  
  if(value === 0 || Number.isNaN(value)) {
    return
  }else if (text === 'positive') {
    return <tr><td>{text}</td><td>{value}%</td></tr>
  } else{
    return <tr><td>{text}</td><td>{value}</td></tr>
  }
}

const Statistics = ({clicks}) => {
  const all = clicks.good + clicks.neutral + clicks.bad
  const average = (clicks.good + clicks.bad * -1) / all
  const positive = clicks.good * (100/all)

  return(
    <table>
      <tbody>
      <StatisticLine text={all === 0} value={0} />
      <StatisticLine text="good" value={clicks.good} />
      <StatisticLine text="neutral" value={clicks.neutral} />
      <StatisticLine text="bad" value={clicks.bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const goodIncrease = () => 
    setClicks({ ...clicks, good: clicks.good + 1 })

  const neutralIncrease = () => 
    setClicks({ ...clicks, neutral: clicks.neutral + 1 })

  const badIncrease = () => 
    setClicks({ ...clicks, bad: clicks.bad + 1 })


  return (
    <div>
      <Display text='give feedback'/>
      <Button onClick={goodIncrease} text='good' />
      <Button onClick={neutralIncrease} text='neutral' />
      <Button onClick={badIncrease} text='bad' />
      <Display text='statistics'/>
      <Statistics clicks={clicks}/>
    </div>
  )
}

export default App