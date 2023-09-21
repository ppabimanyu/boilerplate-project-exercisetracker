// eslint-disable-next-line
const express = require('express')
const UserServices = require('../services/userServices')
/**
 * You can make a `GET` request to `~/api/users` to get a list of all users. This request response with an array of objects with `username` and `_id` properties.
 * @param {express.Request} request
 * @param {express.Response} response
 */
async function getAllUsers(request, response) {
  const users = await UserServices.getAllUsersWithoutLogs()

  response.json(users)
}

/**
 * You can `POST` to `~/api/users` with form data username to create a new user. The returned response will be an object with `username` and `_id` properties.
 * @param {express.Request} request
 * @param {express.Response} response
 */
async function createNewUser(request, response) {
  const { username } = request.body
  const { ok, data } = await UserServices.createNewUser(username)

  if (ok) {
    response.json(data)
  } else {
    response.status(500).json(data)
  }
}

/**
 * You can `POST` to `~/api/users/:_id/exercises` with form data `description`, `duration`, and optionally `date`. If no date is supplied, the current date will be used. The response will be the user object with the exercise fields added.
 * @param {express.Request} request
 * @param {express.Response} response
 */
async function postUserExercise(request, response) {
  const { _id } = request.params
  const { description, duration, date } = request.body
  const { ok, data } = await UserServices.postNewUserExercise(_id, description, duration, date)

  if (ok) {
    response.json(data)
  } else {
    response.status(400).json({ message: data })
  }
}

/**
 * You can make a `GET` request to `~/api/users/:_id/logs` to retrieve a full exercise log of any user. This returns an user object with a `count` property representing the number of exercises that belong to that user and a `log` property which is an array of all exercises added (Each of them consist in an object with the `description`, `duration` and `date` properties).
 * @param {express.Request} request
 * @param {express.Response} response
 */
async function getExercisesFromUser(request, response) {
  const { _id } = request.params
  const { from, to, limit } = request.query
  const { ok, data } = await UserServices.getUserByIdWithLog(_id, { from, to, limit })

  if (ok) {
    response.json(data)
  } else {
    response.status(400).json(data)
  }
}

module.exports = {
  getAllUsers,
  createNewUser,
  postUserExercise,
  getExercisesFromUser
}