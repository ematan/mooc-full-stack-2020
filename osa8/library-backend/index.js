const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const loaders = require('./loaders')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')
const { MONGODB_URI } = require('./utils/config')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch( e => {
    console.log('error connection to MongoDB', e.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {
        currentUser,
        loaders
      }
    }
    return {
      loaders
    }
  }
})

// changed port to 3001

server.listen({ port: config.PORT }).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})