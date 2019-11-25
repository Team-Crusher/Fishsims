const {createStore, combineReducers} = require('redux')
const {gameState} = require('./gameState')
const {players} = require('./players')

const reducer = combineReducers({gameState, players})

const store = createStore(reducer)

module.exports = store
