import { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Content = ({anecdotes, votes}) => {
  const most = votes.reduce((accumulator, currentValue) => {
    return Math.max(accumulator, currentValue);
    }, votes[0])
  const index = votes.indexOf(most);
  if (most == 0){
    return 
  } else{
    return <div>{anecdotes[index]} <p>Has {votes[index]} votes</p></div>
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const randomSelected = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  const [votes, setVotes] = useState(() => Array(anecdotes.length).fill(0))
  const vote = () =>{
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }



  return (
    <div>
      <Display text='Anecdotes of the day'/>
      <div>{anecdotes[selected]}</div>
      <div>Has {votes[selected]} votes</div>
      <Button onClick={vote} text='vote' />
      <Button onClick={randomSelected} text='next anecdote' />
      <Display text='Anecdote with most votes'/>
      <Content anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App