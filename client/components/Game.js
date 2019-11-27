/* eslint-disable camelcase */
import React from 'react'
import * as PIXI from 'pixi.js'
// import {keyboard, hitTestRectangle} from '../script/PIXIutils'
import store from '../store'
import {mount, start} from '../script/game'
import GameControls from './GameControls'

class Game extends React.Component {
  componentDidMount() {
    mount(this.mount) // mounts component
    start() // starft actual game
  }

  componentDidUpdate() {}

  render() {
    return (
      <div
        id="PIXIapp"
        ref={ref => {
          this.mount = ref
        }}
      >
        <GameControls />
      </div>
    )
  }
}

export default Game
