require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())


morgan.token('body',  function(request) {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  } else {
    return ''
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (req,res) => {
  res.status(200).send('<h1>Holo!</h1><p>Nothing to see here :D!</p>')
})

app.get('/api/persons', (req,res) => {
  Person.find({}).then(p => {
    console.log('get persons')
    res.json(p)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(e => next(e) )
})

app.get('/info', (req,res,next) => {
  Person
    .find({})
    .then(result => {
      const p_l = result.length
      const first_row = `<p>Phonebook has info for ${p_l} people.</p>`
      const d = new Date().toString()
      res.status(200).send(`${first_row}<br>${d}`)
    })
    .catch(e => next(e))
})

app.delete('/api/persons/:id', (req,res,next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(res => {
      res.status(204).end()
    })
    .catch(e => next(e))
})

app.put('/api/persons/:id', (req,res,next) => {
  const body = req.body
  Person.findByIdAndUpdate(req.params.id, { number: body.number }, { new: true })
    .then( updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(e => next(e))
})

app.post('/api/persons', (req, res, next) => {

  const body = req.body
  if (body.name && body.number) {

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person
      .save()
      .then(savedPerson => {
        res.json(savedPerson)
      })
      .catch(e => {
        if (e.name === 'ValidationError') {
          console.log(e.message)
          res.status(400).send(e.message)
        } else {
          next(e)
        }
      })
  } else {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server using ${PORT}`)
})



