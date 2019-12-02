import {Sprite, Text} from 'pixi.js'
import {stage, resources, boatImage} from './game'
import store, {setSelectedObject, setStart} from '../store'
import {TILE_SIZE} from './drawMap.js'

export const makeBoatSprite = boat => {
  const sprite = new Sprite(resources[boatImage].texture)
  sprite.position.set(boat.x, boat.y)
  sprite.interactive = true
  sprite.buttonMode = true
  sprite.on('pointerdown', () => {
    store.dispatch(setSelectedObject(boat))
    const start = {row: boat.y / TILE_SIZE, col: boat.x / TILE_SIZE}
    store.dispatch(setStart(start))
    console.log(start)
  })
  sprite.on('mouseover', () => {
    // TODO: info on hover! :)
    console.log('see props')
  })
  sprite.on('mouseout', () => {
    console.log('no props')
  })
  stage.addChild(sprite)

  const nameText = new Text(boat.ownerName, {
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 'white',
    align: 'center',
    anchor: 0.5
  })

  sprite.addChild(nameText)
  nameText.y += 24

  return sprite
}
