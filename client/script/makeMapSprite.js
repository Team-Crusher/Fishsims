import {Sprite, SCALE_MODES} from 'pixi.js'
import {resources} from './game'

const makeMapSprite = () => {
  const map = new Sprite(resources.map.texture)
  console.log(SCALE_MODES)
  map.texture.baseTexture.scaleMode = 0
  map.scale.set(32, 32)
  return map
}

export default makeMapSprite
