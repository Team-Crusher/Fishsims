const PF = require('pathfinding')
const SEA_LEVEL = 47

const mapToMatrix = map => {
  return map.map(row => row.map(cell => (cell >= SEA_LEVEL ? 1 : 0)))
}

const pfGrid = matrix => new PF.Grid(matrix)
let gridClone

const finder = new PF.AStarFinder()

const path = (start, end, map) => {
  gridClone = pfGrid(mapToMatrix(map)).clone()
  return finder.findPath(start.x, start.y, end.x, end.y, gridClone)
}

module.exports = {mapToMatrix, pfGrid, path}
