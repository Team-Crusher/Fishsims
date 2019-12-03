import {getWater, getWaterNeighbors} from '../../../utilityMethods.js'
import {SEA_LEVEL, TILE_SIZE} from '../CONSTANTS.js'
import store from '../../store'

const getRange = boat => {
  //COLUMN = x, ROW = y
  const boatRangeTiles = []
  for (let row1 = -10; row1 <= 10; row1++) {
    for (let column1 = -10; column1 <= 10; column1++) {
      const row = row1 + boat.y / TILE_SIZE
      const col = column1 + boat.x / TILE_SIZE
      if (0 <= row && row < 65 && 0 <= col && col < 65) {
        boatRangeTiles.push({row, col})
      }
    }
  } // 21 x 21 square
  const waterTiles = getWater(store.getState().map)
  //  const trueRange = []
  // do DFS instead
  return dFS(store.getState().map, boat.x / TILE_SIZE, boat.y / TILE_SIZE)
  /*for (let i = 0; i < boatRangeTiles.length; i++) {
     for (let j = 0; j < waterTiles.length; j++) {
     if (
     boatRangeTiles[i].row === waterTiles[j].row &&
     boatRangeTiles[i].col === waterTiles[j].col
     ) {
     // make sure there are enough water neighbors
     if (getWaterNeighbors(waterTiles[j], waterTiles).length < 5)
     if (
     !(
     waterTiles[j].row + 1 >= SEA_LEVEL &&
     waterTiles[j].row - 1 >= SEA_LEVEL &&
     waterTiles[j].col + 1 >= SEA_LEVEL &&
     waterTiles[j].col - 1 >= SEA_LEVEL
     )
     ) {
     trueRange.push(waterTiles[j])
     continue
     } else {
     trueRange.push(waterTiles[j])
     continue
     }
     }
     }
     }*/
  //  return trueRange
}

function dFS(map, col, row) {
  const visitedTiles = new Set()
  const tiles = []
  function d(x, y, depth) {
    console.log(x, y, depth)
    if (x < 0 || x > 64 || y < 0 || y > 64)
      // out of bounds
      return
    if (map[y][x] >= SEA_LEVEL)
      // on land
      return
    if (visitedTiles.has(`${x}, ${y}`)) return
    if (depth === 10) return
    d(x + 1, y, depth + 1)
    d(x, y + 1, depth + 1)
    d(x, y - 1, depth + 1)
    d(x - 1, y, depth + 1)
    tiles.push({row: y, col: x})
    visitedTiles.add(`${x}, ${y}`)

    //  return dFS(subgraph, coords)
  }
  d(col, row, 0)
  return tiles
}

export default getRange
