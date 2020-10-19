import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filter' onChange={handleChange} />
    </div>
  )
}

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
}

export default connect(
  null,
  { setFilter }
)(Filter)