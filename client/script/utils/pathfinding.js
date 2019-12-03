import PF from 'pathfinding'
import {SEA_LEVEL} from '../CONSTANTS.js'

export const mapToMatrix = map => {
  return map.map(row => row.map(cell => (cell >= SEA_LEVEL ? 1 : 0)))
}

export const pfGrid = matrix => new PF.Grid(matrix)
let gridClone

export const finder = new PF.AStarFinder()

export const path = (start, end, map) => {
  gridClone = pfGrid(mapToMatrix(map)).clone()
  return finder.findPath(start.x, start.y, end.x, end.y, gridClone)
}
