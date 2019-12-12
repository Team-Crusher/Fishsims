import {Sprite, SCALE_MODES} from 'pixi.js'
import {stage, resources, boatImage} from '../game'
const {TILE_SIZE} = require('../CONSTANTS')

export const makePath = pathCoords => {
  const sprite = new Sprite(resources[boatImage].texture)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.tint = 0x00ff00
  sprite.alpha = 0.3
  sprite.position.set(pathCoords.x * TILE_SIZE, pathCoords.y * TILE_SIZE)
  stage.addChild(sprite)
  return sprite
}
