import PF from 'pathfinding'
import {SEA_LEVEL} from '../CONSTANTS.js'

const mapToMatrix = map => {
  return map.map(row => row.map(cell => (cell >= SEA_LEVEL ? 1 : 0)))
}

const pfGrid = matrix => new PF.Grid(matrix)
let gridClone

const finder = new PF.AStarFinder({
  allowDiagonal: true,
  dontCrossCorners: true
})

const path = (start, end, map) => {
  gridClone = pfGrid(mapToMatrix(map)).clone()
  return finder.findPath(start.x, start.y, end.x, end.y, gridClone)
}

export default path
