import {Text} from 'pixi.js'
import store, {updateBoat} from '../../store'
const {TILE_SIZE} = require('../../../server/CONSTANTS')

export const setBoatName = (boatId, name, style) => {
  const nameText = new Text(name, style)
  nameText.resolution = 4
  nameText.y += 24
  nameText.x -= (nameText.width - TILE_SIZE) / 2
  const boat = store.getState().boats.filter(b => b.id === boatId)[0]
  boat.name = name
  store.dispatch(updateBoat(boat))
  nameText.zIndex = 9000
  boat.sprite.addChild(nameText)
}
