require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

//no testing for now, but
if (process.env.NODE_ENV === 'test'){
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  PORT,
  MONGODB_URI
}