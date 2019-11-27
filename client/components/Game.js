/* eslint-disable camelcase */
import React from 'react'
import * as PIXI from 'pixi.js'
import {keyboard, hitTestRectangle} from '../script/PIXIutils'
import {drawMap} from '../script/drawMap.js'
import store from '../store'
import {mount, start} from '../script/game'

class Game extends React.Component {
  componentDidMount() {
    const ctx = this.map.getContext('2d')
    // ctx.clearRect(0, 0, 768, 640)
    drawMap(ctx)
    mount(this.mount, ctx) // mounts component
    start() // start actual game
  }

  componentDidUpdate() {}

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
        />
      </div>
    )
  }
}

export default Game
