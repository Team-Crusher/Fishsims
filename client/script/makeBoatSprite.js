import {Sprite, Text, Graphics, SCALE_MODES} from 'pixi.js'
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
  sprite.zIndex = 1000
  sprite.position.set(boat.x, boat.y)

  //----------------------------Create boat text & shapes ----------------------

  //highlight rectangle
  const selectedHighlight = new Graphics()
  selectedHighlight.beginFill(1, 0.2) // Color it black
  selectedHighlight.drawRect(0, 0, 32, 32)
  selectedHighlight.endFill()

  const rectangleUnderText = new Graphics()
  rectangleUnderText.beginFill(0xffffff, 0.05) // Color it black
  rectangleUnderText.drawRect(0, 0, 220, 55)
  rectangleUnderText.endFill()

  const textStyle = {
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 'black',
    align: 'center',
    anchor: 0.5
  }
  let fishCaught
  const boatName = new Text(boat.ownerName, textStyle)
  const boatRange = new Text(`Max Range: ${boat.maxDistance}`, textStyle)
  const boatFuel = new Text(`Fuel: ${boat.fuel}`, textStyle)

  boatRange.x += 30
  boatRange.y -= 25

  boatFuel.x += 30
  boatFuel.y -= 10

  boatName.y += 24

  rectangleUnderText.y -= 30
  rectangleUnderText.x += 25
  //----------------------------End creating boat text ------------------------

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
        store.dispatch(setRange(getRange(boat)))
        sprite.addChild(selectedHighlight)
      } else {
        store.dispatch(setSelectedObject({}))
        store.dispatch(setStart({}))
        sprite.removeChild(selectedHighlight)
      }
    })

    sprite.on('mouseover', () => {
      //declare fish here because otherwise cant access store
      let boatfish = store
        .getState()
        .boats.filter(b => b.ownerSocket === socket.id)[0]

      fishCaught = new Text(
        `🐟 Shallow: ${boatfish.fishes.shallows}, deep: ${
          boatfish.fishes.deep
        }, openOcean: ${boatfish.fishes.openOcean}`,
        textStyle
      )
      fishCaught.x += 30
      fishCaught.y += 5

      sprite.addChild(boatFuel)
      sprite.addChild(boatRange)
      sprite.addChild(fishCaught)
      sprite.addChild(rectangleUnderText)
    })

    sprite.on('mouseout', () => {
      sprite.removeChild(boatFuel)
      sprite.removeChild(boatRange)
      sprite.removeChild(fishCaught)
      sprite.removeChild(rectangleUnderText)
    })
  }
  stage.addChild(sprite)
  sprite.addChild(boatName)

  return sprite
}
