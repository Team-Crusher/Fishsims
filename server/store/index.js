const {createStore, combineReducers} = require('redux')

const {players} = require('./players')
const {fish} = require('./fish')
const {board} = require('./board')
const {status} = require('./status')

const reducer = combineReducers({fish, players, board, status})

const makeStore = () => {
  return createStore(reducer)
}

module.exports = makeStore
