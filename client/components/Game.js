import React from 'react'
import {connect} from 'react-redux'
import {drawMap} from '../script/sprites'
import socket from '../socket'

class Game extends React.Component {
  componentDidMount() {
    const ctx = this.map.getContext('2d')
    socket.emit('ready')
    socket.on('update-map', map => {
      console.log('drawing')
      drawMap(ctx, map)
    })
    // socket.on('spawn-me', dock => {
    //   store.dispatch(setName(dock.pName))
    // })
  }

  render() {
    return (
      <div id="game-component">
        <canvas
          id="map"
          width={window.innerHeight}
          height={window.innerHeight}
          ref={ref => {
            this.map = ref
          }}
        />
      </div>
    )
  }
}

const mapState = state => ({
  game: state.pixiGameState
})

export default connect(mapState)(Game)
