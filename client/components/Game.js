/* eslint-disable camelcase */
import React from 'react'
import {drawMap} from '../script/drawMap.js'
//import newMap from '../../server/script/newMap.js'
import store from '../store'
import {start, mount} from '../script/game'
import {ControlPanel} from './'
import socket from '../socket'

class Game extends React.Component {
  componentDidMount() {
    console.log('MOUNTING')
    mount(this.mount) // mounts component

    // i assume that this socket only happens once
    socket.on('update-map', () => {
      const ctx = this.map.getContext('2d')
      start(drawMap(ctx, store.getState().map)) // start actual game
      //update map
      console.log('drawing map')
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
          onMouseMove={e =>
            // console.log(
            //   `row: ${Math.floor(e.clientY / 32)}, col: ${Math.floor(
            //     e.clientX / 32
            //   )}`
            // )
            {}
          }
        >
          <ControlPanel />
        </div>
      </div>
    )
  }
}

export default Game
