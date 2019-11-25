const {createStore, combineReducers} = require('redux')

const {players} = require('./players')
const {fish} = require('./fish')
const {board} = require('./board')

const reducer = combineReducers({fish, players, board})

const store = createStore(reducer)

module.exports = store
