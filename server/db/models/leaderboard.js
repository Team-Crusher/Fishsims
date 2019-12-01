const Sequelize = require('sequelize')
const db = require('../db')

const Leaderboard = db.define('leaderboard', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  board: {
    type: Sequelize.ENUM(['ALL', 'DAY'])
  },
  color: {
    type: Sequelize.STRING
  }
})

module.exports = Leaderboard
