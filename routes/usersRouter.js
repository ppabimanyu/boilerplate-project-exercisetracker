const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/usersController')

// ~/api/users
router
  .get('/', UsersController.getAllUsers)
  .post('/', UsersController.createNewUser)
  .post('/:_id/exercises', UsersController.postUserExercise)
  .get('/:_id/logs', UsersController.getExercisesFromUser)

module.exports = router