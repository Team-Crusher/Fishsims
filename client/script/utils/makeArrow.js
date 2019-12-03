import {Sprite, SCALE_MODES} from 'pixi.js'
import {stage, resources, arrowSheet} from '../game'
import {TILE_SIZE} from '../CONSTANTS'

const NORTH = 0
const EAST = 1
const SOUTH = 2
const WEST = 3

/**
 * tells where next is in relation to cur
 * @param {*} cur
 * @param {*} next
 */
export function coordRelation(cur, next) {
  if (cur[0] > next[0]) {
    return WEST
  } else if (cur[0] < next[0]) {
    return EAST
  }
  if (cur[1] > next[1]) {
    return SOUTH
  } else if (cur[1] < next[1]) {
    return NORTH
  }
}

// 4 start     (0 ,1 ,2 ,3 )
// 4 lines     (4 ,5 ,6 ,7 )
// 4 turns     (8 ,9 ,10,11)
// 4 ending x  (12,13,14,15)

export function coordsToArrowTypes(arr) {
  const arrowTypes = new Map()
  let previous = null
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]
    const next = arr[i + 1]
    console.log(current, next)
    if (previous) {
      if (next) {
        // turn or line
        if (!(next[0] === previous[0] || next[1] === previous[1])) {
          arrowTypes.set(current, 8 + coordRelation(current, next))
        } else {
          // line
          arrowTypes.set(current, 4 + coordRelation(current, next))
        }
      } else {
        // ending arrow
        arrowTypes.set(current, 12 + coordRelation(previous, current))
      }
    } else {
      // starting point
      arrowTypes.set(current, coordRelation(current, next))
    }
    previous = current
  }
  return arrowTypes
}

export function arrowIntToResource(num) {
  return resources[arrowSheet].spritesheet.textures[`arrow${num}.png`]
}

export function putArrowOnMap(pathFindResult) {
  const arrow = coordsToArrowTypes(pathFindResult)
  for (let key of arrow) {
    const type = key[1]
    const part = new Sprite(arrowIntToResource(type))
    part.zIndex = -69
    part.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
    part.position.set(
      key[0][0] * TILE_SIZE + TILE_SIZE / 2,
      key[0][1] * TILE_SIZE + TILE_SIZE / 2
    )
    stage.addChild(part)
  }
}

export function removeArrow() {}

// export function p(x, y) {
//   return {x, y}
// }
// const testArrow = [p(0, 0), p(0, 1), p(0, 2)]
// const testArrow = [p(0, 0), p(0, 1), p(0, 2), p(1, 2)]
// console.log(coordsToArrowTypes(testArrow))
