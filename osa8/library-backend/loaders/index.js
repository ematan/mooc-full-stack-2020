const DataLoader = require('dataloader')
const Book = require('../models/books')
const _ = require('lodash')

const customLoader = new DataLoader( async (authors) => {
  const books = await Book.find({})
  const authorCount = _.countBy(books.map(b => b.author), a => a)
  return authors.map(a => authorCount[a] || 0)
})

module.exports = { customLoader }