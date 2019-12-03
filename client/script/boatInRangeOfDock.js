import {TILE_SIZE} from './drawMap'

export const boatInRangeOfDock = (boat, dock) => {
  const distance = Math.sqrt(
    Math.pow(boat.x - TILE_SIZE * dock.col, 2) +
      Math.pow(boat.y - TILE_SIZE * dock.row, 2)
  )
  if (distance < (TILE_SIZE + 1) * Math.sqrt(2)) return true
  return false
}
