import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => (
  <input  value={newFilter}
          onChange={handleFilterChange}
  />
)

export default Filter