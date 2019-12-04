import {Text} from 'pixi.js'
import store from '../../store'

export const setBoatName = (boatId, name, style) => {
  const nameText = new Text(name, style)
  nameText.y += 24
  const boat = store.getState().boats.filter(b => b.id === boatId)[0]
  boat.sprite.addChild(nameText)
}
