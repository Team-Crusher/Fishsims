import {SEA_LEVEL, TILE_SIZE} from '../CONSTANTS.js'
import store from '../../store'

const getRange = boat => {
  //COLUMN = x, ROW = y
  const boatRangeTiles = []
  const range = boat.maxDistance
  for (let row1 = -1 * range; row1 <= range; row1++) {
    for (let column1 = -1 * range; column1 <= range; column1++) {
      const row = row1 + boat.y / TILE_SIZE
      const col = column1 + boat.x / TILE_SIZE
      if (0 <= row && row < 65 && 0 <= col && col < 65) {
        boatRangeTiles.push({row, col})
      }
    }
  } // 21 x 21 square
  return bfs(
    store.getState().map,
    boat.x / TILE_SIZE,
    boat.y / TILE_SIZE,
    range
  )
}

export const bfs = (map, startX, startY, range) => {
  const realTiles = []
  const visitedTiles = new Set()
  function getNear(col, row) {
    const near = []
    const add = (x, y) => {
      if (
        x >= 0 &&
        x <= 64 &&
        y >= 0 &&
        y <= 64 &&
        map[y][x] < SEA_LEVEL &&
        !visitedTiles.has(x + ',' + y)
      ) {
        near.push({col: x, row: y})
        visitedTiles.add(x + ',' + y)
      }
    }
    add(col - 1, row)
    add(col + 1, row)
    add(col, row + 1)
    add(col, row - 1)
    return near
  }

  let depth = 0
  let tiles = [{col: startX, row: startY}]
  let nextTiles = []
  while (tiles.length) {
    const current = tiles.shift()
    realTiles.push(current)
    nextTiles.push(...getNear(current.col, current.row))
    if (tiles.length === 0) {
      if (depth === range) {
        break
      }
      depth++
      tiles = [...nextTiles]
      nextTiles = []
    }
  }
  return realTiles
}

export default getRange
