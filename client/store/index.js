import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import map from './map'
import fish from './fish'
import boats from './boats'
import view from './view'
import player from './player'
import chat from './chat'
import route from './route'
import lobby from './lobby'

const reducer = combineReducers({
  user,
  map,
  fish,
  boats,
  view,
  player,
  chat,
  route,
  lobby
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './map'
export * from './fish'
export * from './boats'
export * from './view'
export * from './player'
export * from './chat'
export * from './route'
export * from './lobby'
