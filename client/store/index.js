import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import map from './map'
import fishes from './fish'
import boats from './boats'
import view from './view'
import player from './player'
import chat from './chat'
import lobby from './lobby'
import fisheries from './fisheries'
import route from './route'
import title from './title'
import pixiGameState from './pixiGameState'
import selectedObject from './selectedObject'
import actionsReel from './actionsReel'
import serverActionsReel from './serverActionsReel'
import pfGrid from './pfGrid'
import leaderboards from './leaderboards'

const reducer = combineReducers({
  map,
  fishes,
  boats,
  view,
  player,
  chat,
  lobby,
  route,
  fisheries,
  title,
  pixiGameState,
  selectedObject,
  actionsReel,
  pfGrid,
  leaderboards,
  serverActionsReel
})

// TODO eventually get rid of the logger
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './map'
export * from './pfGrid'
export * from './fish'
export * from './boats'
export * from './view'
export * from './player'
export * from './chat'
export * from './lobby'
export * from './fisheries'
export * from './route'
export * from './title'
export * from './pixiGameState'
export * from './selectedObject'
export * from './actionsReel'
export * from './leaderboards'
export * from './serverActionsReel'
