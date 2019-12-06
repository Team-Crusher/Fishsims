import {Sprite, SCALE_MODES} from 'pixi.js'
import {resources} from '../game'
import store, {setEnd} from '../../store'
import {TILE_SIZE} from '../drawMap.js'
import {makeDarker} from '../utils'
import {N, mountains, grass, sand} from '../CONSTANTS.js'

const makeMapSprite = () => {
  const map = new Sprite(resources.map.texture)
  map.zIndex = -9001
  map.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  map.scale.set(1, 1)
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
      if (x >= mountains) {
        ctx.fillStyle = makeDarker(
          'rgb(169, 169, 169)',
          (x - mountains) / (N - mountains) / 5
        )
      } else if (x < mountains && x >= grass) {
        // grass
        ctx.fillStyle = makeDarker(
          'rgb(37, 151, 27)',
          (x - grass) / (mountains - grass) / 2
        )
      } else if (x < grass && x >= sand) {
        // sand
        ctx.fillStyle = makeDarker(
          'rgb(245,222,179)',
          (x - sand) / (grass - sand) / 10
        )
      } else if (x < sand) {
        // water rgb(30,144,255) idk someone who isnt color blind shold choose a starting color
        ctx.fillStyle = makeDarker('rgb(30,144,255)', (1 - x / sand) / 2)
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
