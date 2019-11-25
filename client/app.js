import React from 'react'
import {useDispatch, connect} from 'react-redux'
//import {addPlayer} from './store/game.js'
import socket from './socket'
import {Game, Home, Chat} from './components'
// import Routes from './routes'

const App = props => {
  const dispatch = useDispatch()
  const handleClick = () => {
    console.log('you clicked')
    // dispatch(addPlayer('abc'))
  }

  return (
    <div>
      {props.route === 'HOME' ? <Home /> : null}
      {props.route === 'GAME' ? (
        <>
          <Game />
          <Chat />
        </>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    route: state.route
  }
}

export default connect(mapStateToProps)(App)
