import store from '../../store'
import {TILE_SIZE} from '../CONSTANTS'

export const findOpenWaterNeighbor = waterNeighbors => {
  const allBoats = store.getState().boats
  for (let i = 0; i < waterNeighbors.length; i++) {
    const wN = waterNeighbors[i]
    let isWnOccupied = allBoats.some(boat => {
      // console.log('Checking wN: ', wN, ' and boat: ', boat)
      return boat.x / TILE_SIZE === wN.col && boat.y / TILE_SIZE === wN.row
    })
    if (isWnOccupied) {
      continue
    } else {
      return wN
    }
  }
  return false
}
