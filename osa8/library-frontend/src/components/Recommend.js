import React from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import BookTable from './BookTable'

import { ME, ALL_BOOKS } from '../queries'

const Recommend = ({ show } ) => {

  const resultMe = useQuery(ME)
  const resultBooks = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }
  if (resultMe.loading || resultBooks.loading) return <div>loading...</div>
  if (resultMe.error || resultBooks.error) return <div>Error!</div>

  const favoriteGenre = resultMe.data.me.favoriteGenre
  const books = resultBooks.data.allBooks
  const filteredBooks = books.filter(b =>
    favoriteGenre ? b.genres.includes(favoriteGenre.toLowerCase()) : b
  )


  return(
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <BookTable books={filteredBooks} />
    </div>
  )
}

Recommend.propTypes = {
  show: PropTypes.bool,
}

export default Recommend