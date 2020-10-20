const mongoose = require('mongoose')

switch(process.argv.length) {
case 1:
case 2:
  console.log('Provide password with: node mongo.js <password>')
  process.exit(1)
  break
case 3:
case 5: {
  const newName = process.argv[3] || null
  const newNumber = process.argv[4] || null
  const password = process.argv[2]
  runAll(password, newName, newNumber)
  break
}
default:
  console.log('Usage: node mongo.js <password> {name} {number}')
  process.exit(1)
}

function runAll(password, newName, newNumber) {

  const url =
    `mongodb+srv://fullstack:${password}@cluster0.cu4lu.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  const Person = mongoose.model('Person', personSchema)

  if (newName && newNumber) {
    const person = new Person({
      name: newName,
      number: newNumber
    })
    person
      .save()
      .then(() => {
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
      })
      .catch( e => {
        throw e
      })
  } else {
    Person
      .find({})
      .then( res => {
        console.log('Phonebook:')
        res.forEach(p => {
          console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
      })
      .catch(e => {
        throw e
      })
  }
}
