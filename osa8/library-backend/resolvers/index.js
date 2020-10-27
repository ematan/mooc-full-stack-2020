require('dotenv').config()
const Book = require('../models/books')
const Author = require('../models/authors')
const User = require('../models/user')
const { UserInputError, AuthenticationError } = require('apollo-server')


const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args ) => {
      let filters = []

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filters = filters.concat({ author: author })
      }
      if (args.genre) {
        filters = filters.concat({ genres: { $in: args.genre } })
      }

      filters = filters.length === 0 ? {} : { $and: filters }

      return await Book.find(filters).populate('author')
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let book
      try {
        let author = await Author.findOne({ name: args.author })
        if (author) {
          book = new Book({ ...args, author })
          return await book.save()
        }
        //
        author = await new Author({ name: args.author }).validate()

        book = await new Book({ ...args, author })
        await book.save()
        // save author only if book was saved succesfully
        await author.save()

      } catch (e) {

        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      try {
        author.born = args.setBornTo
        return await author.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
      try {
        return await user.save()
      } catch(e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

module.exports = {
  resolvers
}