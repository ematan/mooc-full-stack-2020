import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Select from 'react-select'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>
  if (result.error) return <div>Error!</div>

  let genres = [...new Set(result.data.allBooks.map(b => b.genres).flat())]
  const options = genres.map(g => {
    return {
      value: g.toLowerCase(),
      label: g
    }
  })


  const books = result.data.allBooks
  const filteredBooks = books.filter(b =>
    genre ? b.genres.includes(genre.toLowerCase()) : b
  )

  return (
    <div>
      <h2>books</h2>
      {!genre &&
        <>
          <h3>Filter by genre</h3>
          <Select
            options={options}
            placeholder='Select a genre...'
            onChange={({ label }) => setGenre(label)}
          />
        </>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
Books.propTypes = {
  show: PropTypes.bool,
}

export default Books