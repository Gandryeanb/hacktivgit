const request = require('request')

class UserController {

  static getUserData (req, res) {
    request.get({
      url: `https://api.github.com/user`,
      json: true,
      headers: {
        'User-Agent': 'request',
        "Authorization": 'token '+ process.env.ACCESS_TOKEN
      }, 
    },
    (err, incomingMessage, response) => {
        if (!err) {
          res.status(200).json({
            data: response  
          })
        } else {
          res.status(500).json({
            err: err  
          })
        }
    })
  }

  static staredRepo (req, res) {
    request.get({
      url: `https://api.github.com/users/${req.params.name}/starred`,
      json: true,
      headers: {
        'User-Agent': 'request',
        "Authorization": 'token '+ process.env.ACCESS_TOKEN
      },
    },
    (err, incomingMessage, response) => {
        if (!err) {
          res.status(200).json({
            data: response  
          })
        } else {
          res.status(500).json({
            err: err  
          })
        }
    })
  }

  static createRepo (req, res) {
    request({
      url:'https://api.github.com/user/repos',
      method: 'post',
      json: true,
      headers: {
        'User-Agent': 'request',
        "Authorization": 'token '+ process.env.ACCESS_TOKEN
      },
      body: {
        name: 'testing',
        description: 'testing'
      }
    }, (err, incomingMessage, response) => {
      if (!err) {
        res.status(200).json({
          msg: `create repo with name ${req.body.name} success`,
          data: response,
          data1: incomingMessage
        })
      } else {
        res.status(500).json({
          msg: 'error when creating repository'  
         })
      }
    })
  }

  static currentUserStar (req, res) {
    request.get({
      url: `https://api.github.com/user`,
      json: true,
      headers: {
        'User-Agent': 'request',
        "Authorization": 'token '+ process.env.ACCESS_TOKEN
      }, 
    },
    (err, incomingMessage, response) => {
        if (!err) { 

          request.get({
            url: `https://api.github.com/users/${response.login}/starred`,
            json: true,
            headers: {
              'User-Agent': 'request',
              "Authorization": 'token '+ process.env.ACCESS_TOKEN
            },
          },
          (err, incomingMessage, response) => {
              if (!err) {
                res.status(200).json({
                  data: response  
                })
              } else {
                res.status(500).json({
                  err: err  
                })
              }
          })
        } else {
          res.status(500).json({
            err: err  
          })
        }
    })
  }

  static myRepo (req, res) {
    request({
      url:`https://api.github.com/user/repos`,
      method: 'get',
      json: true,
      headers: {
        'User-Agent': 'request',
        "Authorization": 'token '+ process.env.ACCESS_TOKEN
      }
    }, (err, incomingMessage, response) => {
      if (!err) {
        response.forEach(repo => {
          if (repo.name === req.params.name) {
            res.status(200).json({
              data: repo
            })
          }
        });
      } else {
        res.status(500).json({
          msg: 'error when reading repo'
         })
      }
    })
  }

  static allMyRepo (req, res) {
    request({
      url:`https://api.github.com/user/repos`,
      method: 'get',
      json: true,
      headers: {
        'User-Agent': 'request',
        "Authorization": 'token '+ process.env.ACCESS_TOKEN
      }
    }, (err, incomingMessage, response) => {
      if (!err) {
        res.status(200).json({
          data: response
        })
      } else {
        res.status(500).json({
          msg: 'error when reading repo'
         })
      }
    })
  }

  static watchRepo (req, res) {
    request({
      url:`https://api.github.com/users/${req.params.username}/repos`,
      method: 'get',
      json: true,
      headers: {
        'User-Agent': 'request',
        "Authorization": 'token '+ process.env.ACCESS_TOKEN
      }
    }, (err, incomingMessage, response) => {
      if (!err) {
        res.status(200).json({
          data: response
        })
      } else {
        res.status(500).json({
          msg: 'error when reading repo'
         })
      }
    })
  }
}

module.exports = UserController