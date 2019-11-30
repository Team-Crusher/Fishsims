const {createStore, combineReducers} = require('redux')

const {players} = require('./players')
const {fish} = require('./fish')
const {board} = require('./board')
const {status} = require('./status')
const {docks} = require('./docks')

const reducer = combineReducers({fish, players, board, status, docks})

const makeStore = () => {
  return createStore(reducer)
}

module.exports = makeStore
