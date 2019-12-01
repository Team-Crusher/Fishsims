'use strict'

const db = require('../server/db')
const {Leaderboard} = require('../server/db/models')

// a really bad "random number generator"
// i could use faker but eh
let randSeed = 42069
function random() {
  var x = Math.sin(randSeed++) * 10000
  return x - Math.floor(x)
}

function randInt(s, l) {
  return s + Math.round(random() * l)
}

const randomRGB = () => {
  const r = randInt(0, 255)
  const g = randInt(0, 255)
  const b = randInt(0, 255)
  return `rgb(${r},${g},${b})`
}

const names = require('./names.json')
const randomName = () => {
  return names[randInt(0, names.length - 1)]
}

const randomDate = () => {
  const d = new Date()
  d.setTime(d.getTime() + random() * 2.628e9 * 2 - 2.628e9)
  return d
}

const randomLeaderboardRow = () => {
  return {
    color: randomRGB(),
    score: randInt(0, 42069),
    name: randomName(),
    createdAt: randomDate()
  }
}

const LEADER_NUM = 200
async function seed() {
  await db.sync({force: true})
  await Promise.all(
    Array(LEADER_NUM)
      .fill(0)
      .map(() => Leaderboard.create(randomLeaderboardRow()))
  )
  console.log('db synced!')
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
