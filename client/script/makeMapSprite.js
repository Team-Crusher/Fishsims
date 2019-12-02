import {Sprite, SCALE_MODES} from 'pixi.js'
import {resources} from './game'

const makeMapSprite = () => {
  const map = new Sprite(resources.map.texture)
  map.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  map.scale.set(32, 32)
  return map
}

export default makeMapSprite
