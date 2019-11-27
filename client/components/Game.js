/* eslint-disable camelcase */
import React from 'react'
import * as PIXI from 'pixi.js'
import {keyboard, hitTestRectangle} from '../script/PIXIutils'
import {drawMap} from '../script/drawMap.js'
import store from '../store'
import {start, mount} from '../script/game'
import GameControls from './GameControls'

class Game extends React.Component {
  componentDidMount() {
    const ctx = this.map.getContext('2d')
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    drawMap(ctx)
    mount(this.mount, ctx) // mounts component
    start() // start actual game
  }

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <canvas
          id="map"
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
          <GameControls />
        </div>
      </div>
    )
  }
}

export default Game
