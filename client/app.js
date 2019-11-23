import React from 'react'
import {useDispatch} from 'react-redux'
//import {addPlayer} from './store/game.js'
import socket from './socket'
import {Game, Home} from './components'
// import Routes from './routes'

const App = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    console.log('you clicked')
    // dispatch(addPlayer('abc'))
  }

  return (
    <div>
      <Game />
      {/* <Home /> */}
    </div>
  )
}

export default App
