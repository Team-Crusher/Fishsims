import {Sprite, SCALE_MODES} from 'pixi.js'
import {resources} from '../game'
const {TILE_SIZE} = require('../../../server/CONSTANTS')

const padding = {x: 30, y: 10}

export const makeCloudSprite = () => {
  const cloud = new Sprite(resources.cloud.texture)
  cloud.position.set(-padding.x * TILE_SIZE, -padding.y * TILE_SIZE)
  cloud.zIndex = -8999
  cloud.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  return cloud
}
