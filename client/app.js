import React from 'react'
import {useDispatch} from 'react-redux'
//import {addPlayer} from './store/game.js'
import {Game} from './components'
import socket from './socket'
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
      <button type="button" onClick={handleClick}>
        Buy Boat
      </button>
    </div>
  )
}

export default App
