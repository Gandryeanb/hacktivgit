const route = require('express').Router()
const UserController = require('../controllers/userController')

route.get('/me', UserController.getUserData)
route.get('/starred/me', UserController.currentUserStar)
route.get('/starred/:name', UserController.staredRepo)
route.post('/', UserController.createRepo)
route.get('/:name', UserController.myRepo)
route.get('/', UserController.allMyRepo)
route.get('/watch/:username', UserController.watchRepo)

module.exports = route