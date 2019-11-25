const {createStore, combineReducers} = require('redux')
const {gameState} = require('./gameState')

const reducer = combineReducers({gameState})

const store = createStore(reducer)

module.exports = store
