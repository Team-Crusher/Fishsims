import {Sprite, SCALE_MODES} from 'pixi.js'
import {stage, resources, decoSheet} from '../game'
const {TILE_SIZE} = require('../CONSTANTS')
import store from '../../store'

export function populateDecorationSprites() {
  store.getState().decorations.forEach(e => {
    makeDecorationSprite(e)
  })
}

export function makeDecorationSprite(deco) {
  const sprite = new Sprite(getDecoTexture(deco))
  sprite.position.set(
    deco.x * TILE_SIZE + TILE_SIZE / 2,
    deco.y * TILE_SIZE + TILE_SIZE / 2
  )
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.zIndex = -9000
  stage.addChild(sprite)
  return sprite
}

function getDecoTexture(deco) {
  // console.log(deco.resource)
  const res = resources[decoSheet].spritesheet.textures[deco.resource]
  // console.log(res)
  return res
}
