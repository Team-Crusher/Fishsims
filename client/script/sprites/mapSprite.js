import {Sprite, SCALE_MODES} from 'pixi.js'
import {resources} from '../game'
const {TILE_SIZE} = require('../../../server/CONSTANTS')
import {makeDarker} from '../utils'

const makeMapSprite = () => {
  const map = new Sprite(resources.map.texture)
  map.zIndex = -9001
  map.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  map.scale.set(TILE_SIZE, TILE_SIZE)
  map.interactive = true
  //  map.on('click', handleClick)
  return map
}

const FAKE_DRAW_SIZE = 1

// eslint-disable-next-line complexity
export function drawMap(ctx, map) {
  ctx.canvas.width = map[0].length
  ctx.canvas.height = map.length
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const x = map[row][col]
      if (x >= 60) ctx.fillStyle = 'silver'
      else if (x < 60 && x >= 50) {
        // grass
        ctx.fillStyle = makeDarker('rgb(37, 151, 27)', (x - 50) / 11 / 5)
      } else if (x < 50 && x >= 47) {
        // sand
        ctx.fillStyle = makeDarker('rgb(245,222,179)', (x - 47) / 4 / 10)
      } else if (x < 47) {
        // water rgb(30,144,255) idk someone who isnt color blind shold choose a starting color
        ctx.fillStyle = makeDarker('rgb(30,144,255)', (1 - x / 47) / 2)
      }
      ctx.fillRect(
        FAKE_DRAW_SIZE * col,
        FAKE_DRAW_SIZE * row,
        FAKE_DRAW_SIZE,
        FAKE_DRAW_SIZE
      )
    }
  }
  return ctx.canvas.toDataURL()
}

export default makeMapSprite
