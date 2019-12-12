import store from '../../store'
const {TILE_SIZE} = require('../CONSTANTS')
export const findOpenWaterNeighbor = waterNeighbors => {
  const allBoats = store.getState().boats
  for (let i = 0; i < waterNeighbors.length; i++) {
    const wN = waterNeighbors[i]
    let isWnOccupied = allBoats.some(boat => {
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
