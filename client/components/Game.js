import React from 'react'
import {drawMap} from '../script/sprites'
import store, {setName} from '../store'
import {start, mount} from '../script/game'
import {ControlPanel, PlayerInfo, CurrentAction, AudioPlayer} from './'
import socket from '../socket'

class Game extends React.Component {
  componentDidMount() {
    const ctx = this.map.getContext('2d')
    mount(this.mount) // mounts component
    socket.on('update-map', () => {
      const map = drawMap(ctx, store.getState().map)
      start(map) // start actual game
    })
    socket.on('spawn-me', dock => {
      store.dispatch(setName(dock.pName))
    })
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
        <div
          id="PIXIapp"
          ref={ref => {
            this.mount = ref
          }}
        >
          <PlayerInfo />
          <ControlPanel />
          <CurrentAction />
          <AudioPlayer />
        </div>
      </div>
    )
  }
}

export default Game
