const {createStore, combineReducers} = require('redux')

const {players} = require('./players')
const {fish} = require('./fish')
const {board} = require('./board')

const reducer = combineReducers({fish, players, board})

const makeStore = () => createStore(reducer)

module.exports = makeStore
