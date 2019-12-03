import {SEA_LEVEL} from '../CONSTANTS.js'
/**
 * returns array of land tiles
 * @param {Array} map   2d array of 'heights' between 0 & 65
 */
const getWater = map => {
  const waterTiles = []
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] < SEA_LEVEL) waterTiles.push({row, col})
    }
  }
  return waterTiles
}

export default getWater
