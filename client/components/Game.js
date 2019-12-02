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
    const ctx = this.map.getContext('2d')
    //    drawMap(ctx, newMap())
    // console.log('map: ', store.getState().map)
    // drawMap(ctx, store.getState().map)
    mount(this.mount) // mounts component
    socket.on('update-map', () => {
      console.log('drawing map')
      const map = drawMap(ctx, store.getState().map)
      start(map) // start actual game
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
            console.log(
              `row: ${Math.floor(e.clientY / 32)}, col: ${Math.floor(
                e.clientX / 32
              )}`
            )
          }
        >
          <ControlPanel />
        </div>
      </div>
    )
  }
}

export default Game
