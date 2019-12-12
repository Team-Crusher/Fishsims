const {SEA_LEVEL} = require('../CONSTANTS')

/**
 * returns array of neighboring water tiles
 * @param {Object}    coordinates (row, col)
 * @param {Array}     2d map array of 'heights' between 0 & 65
 */
const getWaterNeighbors = ({row, col}, map) => {
  const waterNeighbors = []
  if (row < 64 && map[row + 1][col] < SEA_LEVEL) {
    // down, stay
    waterNeighbors.push({row: row + 1, col})
  }
  if (row > 0 && map[row - 1][col] < SEA_LEVEL) {
    // up, stay
    waterNeighbors.push({row: row - 1, col})
  }
  if (col < 64 && map[row][col + 1] < SEA_LEVEL) {
    // stay, right
    waterNeighbors.push({row, col: col + 1})
  }
  if (col > 0 && map[row][col - 1] < SEA_LEVEL) {
    // stay, left
    waterNeighbors.push({row, col: col - 1})
  }
  if (col < 64 && row < 64 && map[row + 1][col + 1] < SEA_LEVEL) {
    // down, right
    waterNeighbors.push({row: row + 1, col: col + 1})
  }
  if (col > 0 && row > 0 && map[row - 1][col - 1] < SEA_LEVEL) {
    // up, left
    waterNeighbors.push({row: row - 1, col: col - 1})
  }
  if (col > 0 && row < 64 && map[row + 1][col - 1] < SEA_LEVEL) {
    // down, left
    waterNeighbors.push({row: row + 1, col: col - 1})
  }
  if (col < 64 && row > 0 && map[row - 1][col + 1] < SEA_LEVEL) {
    // up, left
    waterNeighbors.push({row: row - 1, col: col + 1})
  }
  return waterNeighbors
}

export default getWaterNeighbors
