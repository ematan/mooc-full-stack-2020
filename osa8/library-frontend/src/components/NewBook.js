import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_AUTHORS } from '../queries'

const NewBook = ({ setPage, show, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
      //.graphQLErrors[0].message
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
    onCompleted: () => {
      setPage('books')
    }
  })


  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    const publishedInt = Number(published)
    const a = await createBook({ variables: { title, author, published: publishedInt, genres } })
    console.log(a)
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  show: PropTypes.bool,
  updateCacheWith: PropTypes.func,
  setPage: PropTypes.func,
}

export default NewBook