require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const userRoute = require('./routes/userRoute')
const loginRoute = require('./routes/loginRoute')
app
  .use(express.urlencoded({extended: false}))
  .use(express.json())
  
  .use('/users', userRoute)
  .use('/login', loginRoute)

  .get('/', (req, res) => {
    res.status(200).json({
      msg: 'server On'
    })
  })
  .listen(port, () => {
    console.log(`\n> server listening to port ${port}`)
  })