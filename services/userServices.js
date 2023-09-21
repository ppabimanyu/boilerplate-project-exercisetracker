const User = require('../database/User')
const Exercise = require('../database/Exercise')
const isValidDate = require('../utils/isValidDate')

async function getAllUsersWithoutLogs() {
  const users = await User
    .find({})
    .select({ log: 0 })
    .exec()

  return users
}

async function createNewUser(username) {
  const newUser = new User({ username })

  try {
    const savedUser = await newUser.save()
    return { ok: true, data: savedUser }
  } catch (e) {
    console.error(e.message)
    return { ok: false, data: e.message }
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findById(userId)
    return { ok: true, data: user.toObject() }
  } catch (e) {
    console.error(e.message)
    return { ok: false, data: e.message }
  }
}

async function postNewUserExercise(userId, description, duration, date) {
  const { ok, data } = await getUserById(userId)
  const { dateIsValid, dateObj } = isValidDate(date)

  if (ok && dateIsValid) {
    const newExercise = new Exercise({ description, duration: Number(duration), date: dateObj.toDateString(), userId })

    try {
      await newExercise.save()

      return { ok: true, data: { _id: userId, username: data.username, description, duration: Number(duration), date: dateObj.toDateString() } }
    } catch (e) {
      console.error(e.message)
      return { ok: false, data: e.message }
    }
  }

  return { ok: false, data: `Error: User found: ${ok}. Date valid: ${dateIsValid}` }
}

async function getUserByIdWithLog(userId, options) {
  const { ok, data } = await getUserById(userId)

  if (!ok) {
    return { ok: false, data: `User with _id: ${userId} not found` }
  }

  try {
    const logQuery = await Exercise
      .find({ userId })
      .limit(options.limit ?? 1000)
      .select({ userId: 0, _id: 0 })
      .exec()

    const log = logQuery.map(({ description, duration, date }) => { return { description, duration, date: new Date(date).toDateString() } })

    return { ok: true, data: { ...data, log, count: log.length } }
  } catch (e) {
    console.log(e.message)
    return { ok: false, data: e.message }
  }
}

module.exports = {
  getAllUsersWithoutLogs,
  createNewUser,
  postNewUserExercise,
  getUserByIdWithLog
}