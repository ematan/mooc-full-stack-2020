import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import PropTypes from 'prop-types'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ( { options } ) => {
  const [ name, setName ] = useState('')
  const [ year, setYear ] = useState('')

  const [ updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    const setBornTo = Number(year)
    updateAuthor({ variables: { name, setBornTo } })

    setName('')
    setYear('')
  }

  const mappedOptions = options.map(option => {
    return {
      value: option.name.toLowerCase(),
      label: option.name
    }
  })

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          onChange={({ label }) => setName(label)}
          options={mappedOptions}
          placeholder='select author'
        />
        <div>
          year <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>

      </form>

    </div>
  )

}
EditAuthor.propTypes = {
  options: PropTypes.array,
}

export default EditAuthor