import {Sprite, Text, SCALE_MODES} from 'pixi.js'
import {stage, resources, boatImage} from './game'
import store, {setSelectedObject, setStart, setRange} from '../store'
import {TILE_SIZE} from './drawMap.js'
import socket from '../socket'
import {getWater} from '../../utilityMethods.js'

const getRange = boat => {
  //COLUMN = x, ROW = y
  const boatRangeTiles = []
  for (let row1 = -10; row1 <= 10; row1++) {
    for (let column1 = -10; column1 <= 10; column1++) {
      const row = row1 + boat.y / TILE_SIZE
      const col = column1 + boat.x / TILE_SIZE
      if (0 <= row < 65 && 0 <= col < 65) {
        boatRangeTiles.push({row, col})
      }
    }
  } // 21 x 21 square
  const waterTiles = getWater(store.getState().map)
  const trueRange = []
  for (let i = 0; i < boatRangeTiles.length; i++) {
    for (let j = 0; j < waterTiles.length; j++) {
      if (
        boatRangeTiles[i].row === waterTiles[j].row &&
        boatRangeTiles[i].col === waterTiles[j].col
      ) {
        trueRange.push(boatRangeTiles[i])
      }
    }
  }
  return trueRange
}

export const makeBoatSprite = boat => {
  let isSelected = false
  const sprite = new Sprite(resources[boatImage].texture)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.zIndex = 9001

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
        store.dispatch(setRange(getRange(boat))) // TODO remove the 30
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
