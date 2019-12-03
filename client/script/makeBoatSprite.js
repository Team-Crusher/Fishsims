import {Sprite, Text, SCALE_MODES} from 'pixi.js'
import {stage, resources, boatImage} from './game'
import store, {setSelectedObject} from '../store'
import socket from '../socket'
import {getWater} from '../../utilityMethods'
import {TILE_SIZE} from './drawMap'

export const makeBoatSprite = boat => {
  const sprite = new Sprite(resources[boatImage].texture)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

  sprite.position.set(boat.x, boat.y)
  if (boat.ownerSocket === socket.id) {
    sprite.interactive = true
    sprite.buttonMode = true
    sprite.on('pointerdown', () => {
      store.dispatch(setSelectedObject(boat))

      // TODO: info on hover! :)

      //COLUMN = x, ROW = y
      const boatRangeTiles = []
      for (let row1 = -10; row1 <= 10; row1++) {
        for (let column1 = -10; column1 <= 10; column1++) {
          const row = row1 + boat.y / TILE_SIZE
          const column = column1 + boat.x / TILE_SIZE
          if (0 <= row <= 65 && 0 <= column <= 65) {
            boatRangeTiles.push({row, column})
          }
        }
      }
      console.log('boatRangeTiles, ', boatRangeTiles)
      //boatRangeTiles is an array [{row: 1, column 1}, {row: 2, column 2}]
      //waterTiles an array [{row: 1, column 1}, {row: 2, column 2}]

      //all nearby 10 tiles around the boat
      const waterTiles = getWater(store.getState().map)
      console.log('TCL: waterTiles', waterTiles)
      console.log('TCL: boatRangeTiles[i]', boatRangeTiles[1].column)
      console.log('TCL: waterTiles[i]', waterTiles[1].col)

      const trueRange = []
      for (let i = 0; i < boatRangeTiles.length; i++) {
        for (let j = 0; j < waterTiles.length; j++) {
          // console.log(boatRangeTiles[i])
          if (
            boatRangeTiles[i].row === waterTiles[j].row &&
            boatRangeTiles[i].column === waterTiles[j].col
          ) {
            trueRange.push(boatRangeTiles[i])
          }
        }
      }
      console.log('trueRange', trueRange)
    })

    sprite.on('mouseover', () => {})

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
