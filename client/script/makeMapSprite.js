import {Sprite, SCALE_MODES} from 'pixi.js'
import {resources} from './game'
import store, {setEnd} from '../store'

const makeMapSprite = () => {
  const map = new Sprite(resources.map.texture)
  map.zIndex = -9001
  map.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  map.scale.set(32, 32)
  map.interactive = true
  map.on('pointerdown', () => {
    if (store.getState().pathfinding.start) console.log('hi')
    else console.log('bye')
  })
  return map
}

export default makeMapSprite
