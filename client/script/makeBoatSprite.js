import {Sprite, Text, SCALE_MODES} from 'pixi.js'
import {stage, resources, boatImage} from './game'
import store, {setSelectedObject, setStart} from '../store'
import {TILE_SIZE} from './drawMap.js'
import socket from '../socket'

export const makeBoatSprite = boat => {
  let isSelected = false
  const sprite = new Sprite(resources[boatImage].texture)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

  sprite.position.set(boat.x, boat.y)
  if (boat.ownerSocket === socket.id) {
    sprite.interactive = true
    sprite.buttonMode = true
    sprite.on('click', () => {
      isSelected = !isSelected
      if (isSelected) {
        store.dispatch(setSelectedObject(boat))
        store.dispatch(
          setStart({row: boat.y / TILE_SIZE, col: boat.x / TILE_SIZE})
        )
      } else {
        store.dispatch(setSelectedObject({}))
        store.dispatch(setStart({}))
      }
    })
    sprite.on('mouseover', () => {
      // TODO: info on hover! :)
      console.log('see props')
    })
    sprite.on('mouseout', () => {
      console.log('no props')
    })
  }
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
