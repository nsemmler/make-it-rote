const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.disable('x-powered-by')

// API
app.get('/cows', (req, res, next) => {
  res.status(200).send({ cows: ['cow1', 'cow2', 'cow3'] })
})

// Error Handling
app.use((req, res, next) => {
  next({ status: 404, message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err)

  const errToReturn = {}
  errToReturn.status = err.status || 500
  errToReturn.message = err.message || 'Something went wrong'
  if (process.env.NODE_ENV !== 'production') errToReturn.stack = err.stack

  res.status(errToReturn.status).send(errToReturn)
})

// Listener
const listener = () => `Looking at port ${port}`
app.listen(port, listener)
