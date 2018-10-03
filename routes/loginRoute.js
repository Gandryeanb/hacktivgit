const route = require('express').Router()
const request = require('request')

route.get('/callback', (req, res) => {
  let code = req.query.code

  request.get({
    url: 'https://github.com/login/oauth/access_token',
    json: true,
    body: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code 
    }
  }, (err, incomingMessage,response) => {
    if (!err) {
      res.status(200).json({
        data: response
      })
    } else {
      res.status(500).json({
        msg: err
      })
    }
  })

})

module.exports = route