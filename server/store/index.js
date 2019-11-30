const {createStore, combineReducers} = require('redux')

const {players} = require('./players')
const {fish} = require('./fish')
const {board} = require('./board')
const {status} = require('./status')
const {docks} = require('./docks')
const {endTurns} = require('./endTurns')
const {serverActionsReel} = require('./serverActionsReel')

const reducer = combineReducers({
  fish,
  players,
  board,
  status,
  docks,
  endTurns,
  serverActionsReel
})

const makeStore = () => {
  return createStore(reducer)
}

module.exports = makeStore
