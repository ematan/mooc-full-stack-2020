
import React from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

import EditAuthor from './EditAuthor'


const Authors = ({ token, show }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }
  if (result.loading) return <div>loading...</div>
  if (result.error) return <div>Error!</div>

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token &&
        <EditAuthor options={authors}/>
      }
    </div>
  )
}
Authors.propTypes = {
  show: PropTypes.bool,
  token: PropTypes.string
}

export default Authors
