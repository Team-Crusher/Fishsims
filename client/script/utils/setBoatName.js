import {Text} from 'pixi.js'
import store from '../../store'
import {TILE_SIZE} from '../CONSTANTS'

export const setBoatName = (boatId, name, style) => {
  const nameText = new Text(name, style)
  nameText.resolution = 5
  nameText.y += 24
  nameText.x -= (nameText.width - TILE_SIZE) / 2
  const boat = store.getState().boats.filter(b => b.id === boatId)[0]
  nameText.zIndex = 9000
  boat.sprite.addChild(nameText)
}
