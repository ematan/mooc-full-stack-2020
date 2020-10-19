import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const changedAnecdote = action.data
      return state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
    }
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const anecdoteToChange = await anecdoteService.getOne(id)
    const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes+1 }
    await anecdoteService.update(changedAnecdote)

    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: { anecdotes }
    })
  }
}

export default reducer