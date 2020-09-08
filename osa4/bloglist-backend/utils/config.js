require('dotenv').config()

//I only have prtforward set up for 3001,
//TODO: set to 3003 before submit
const PORT = "3001"
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI
}