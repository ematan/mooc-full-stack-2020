import React from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import Anecdote from './Anecdote'


const AnecdoteList = ( props ) => {
  const vote = (anecdote) => {
    props.addVote(anecdote.id)
    props.setNotification(`You voted ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote)}
          />
        )}
    </div>
  )
}

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired,
  addVote: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const currentFilter = state.filter.toLowerCase()
  return {
    anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(currentFilter))
  }
}

const mapDispatchToProps = { addVote, setNotification }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

