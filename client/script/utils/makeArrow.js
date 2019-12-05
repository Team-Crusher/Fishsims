import {Sprite, SCALE_MODES, Text} from 'pixi.js'
import {stage, resources, arrowSheet} from '../game'
import {TILE_SIZE} from '../CONSTANTS'

const NORTH = 0
const EAST = 1
const SOUTH = 2
const WEST = 3

const toClear = []

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

// north to west 11   0 3 = 3
// west to north 11   3 0 = 3

// north to east 8    0 1 = 1
// east to north 8    1 0 = 1

// east to south 9    1 2 = 3
// south to east 9    2 1 = 3

// south to west 10   2 3 = 5
// west to south 10   3 2 = 5

export function chooseTurn(n, p) {
  switch (n + p) {
    case 1:
      return 9
    case 5:
      return 11
    case 3:
      if (p * n === 0) {
        return 10
      } else {
        return 8
      }
    default:
      return 0
  }
}

export function coordsToArrowTypes(arr) {
  const arrowTypes = new Map()
  let previous = null
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]
    const next = arr[i + 1]
    if (previous) {
      if (next) {
        // turn or line
        const nextR = coordRelation(current, next)
        const prevR = coordRelation(current, previous)
        if (!(next[0] === previous[0] || next[1] === previous[1])) {
          let num = chooseTurn(nextR, prevR)
          arrowTypes.set(current, num)
        } else {
          // line
          arrowTypes.set(current, 4 + nextR)
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
  const sprites = []
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
    sprites.push(part)
  }
  toClear.push(() => sprites.forEach(s => s.destroy()))
}

export function clearArrows() {
  while (toClear.length) {
    toClear.shift()()
  }
}
