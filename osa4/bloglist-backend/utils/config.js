require('dotenv').config()

//I only have prtforward set up for 3001,
//TODO: set to 3003 before submit
const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test'){
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

if (process.env.NODE_ENV === 'development'){
  MONGODB_URI = process.env.DEV_MONGODB_URI
}

module.exports = {
  PORT,
  MONGODB_URI
}