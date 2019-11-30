/* eslint-disable camelcase */
import React from 'react'
import {drawMap} from '../script/drawMap.js'
import newMap from '../../server/script/newMap.js'
import store from '../store'
import {start, mount} from '../script/game'
import {ControlPanel} from './'

class Game extends React.Component {
  componentDidMount() {
    const ctx = this.map.getContext('2d')
    drawMap(ctx, newMap())
    // console.log('map: ', store.getState().map)
    drawMap(ctx, store.getState().map)
    mount(this.mount) // mounts component
    start() // start actual game
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
          <ControlPanel />
        </div>
      </div>
    )
  }
}

export default Game
