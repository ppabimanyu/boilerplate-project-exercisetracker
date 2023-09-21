const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./routes/usersRouter')
require('dotenv').config()
require('./database/connection')

const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/users', usersRouter)

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})