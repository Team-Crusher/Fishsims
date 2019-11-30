const PF = require('pathfinding')
const {SEA_LEVEL} = require('../../client/script/drawMap.js')

const mapToMatrix = map => {
  return map.map(row => row.map(cell => (cell <= SEA_LEVEL ? 1 : 0)))
}

const pfGrid = matrix => new PF.Grid(matrix)
let gridClone = pfGrid.clone()

const finder = new PF.AStarFinder({
  allowDiagonal: true,
  dontCrossCorners: true
})

const path = (start, end) => {
  gridClone = pfGrid.clone()
  return finder.findPath(start.x, start.y, end.x, end.y, gridClone)
}

module.exports = {mapToMatrix, pfGrid, path}
