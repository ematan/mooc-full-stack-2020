const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
//`mongodb+srv://fullstack:<password>@cluster0.cu4lu.mongodb.net/phonebook?retryWrites=true&w=majority`

console.log('Connecting to', url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(e => {
    console.log('error connecting to MongoDB', e)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, minlength: 3 },
  number: { type: String, required: true, minlength: 8 }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Person', personSchema)