import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import BookTable from './BookTable'

import { ME, ALL_BOOKS } from '../queries'

const Recommend = ({ show } ) => {
  const [ books, setBooks ] = useState(null)
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(ME)

  const [ getBooks, { loading, error, data } ] = useLazyQuery(ALL_BOOKS)

  const favoriteGenre = dataMe?.me?.favoriteGenre

  useEffect(() => {
    getBooks({ variables: { genre: favoriteGenre } })
  },[getBooks, favoriteGenre] )

  if (!show) {
    return null
  }
  if (loadingMe || loading) return <div>loading...</div>
  if (errorMe || error) return <div>Error!</div>


  if (data && data.allBooks && books !== data.allBooks) {
    setBooks(data.allBooks)
  }

  return(
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <BookTable books={books} />
    </div>
  )
}

Recommend.propTypes = {
  show: PropTypes.bool,
}

export default Recommend