import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    const currentFilter = state.filter.toLowerCase()
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(currentFilter))
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`You voted ${anecdote.content}`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )

}

export default AnecdoteList