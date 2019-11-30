const Sequelize = require('sequelize')
const db = require('../db')

const Leaderboard = db.define('leaderboard', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.NUMBER,
    allowNull: false
  }
})

module.exports = Leaderboard
