import {Sprite, Text, Graphics, SCALE_MODES} from 'pixi.js'
import {stage, resources, boatImage} from './game'
import store, {setSelectedObject, setStart, setEnd, setRange} from '../store'
import {TILE_SIZE, SEA_LEVEL} from './CONSTANTS.js'
import socket from '../socket'
import {getRange, commitToReel} from './utils'
//import {getWater, getWaterNeighbors} from '../../utilityMethods.js'

export const makeBoatSprite = boat => {
  let isSelected = false
  const sprite = new Sprite(resources[boatImage].texture)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.zIndex = 9001
  sprite.position.set(boat.x, boat.y)
  let rangeSprites = []

  //----------------------------Create boat text & shapes ----------------------//
  const rectangle = new Graphics()
  rectangle.beginFill(33, 0.2) // Color it black
  rectangle.drawRect(0, 0, 32, 32)
  rectangle.endFill()
  rectangle.zIndex = 1 //make zIndex to be below boat's ('sprite')

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
  //----------------------------End creating boat text ------------------------//
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
        sprite.addChild(rectangle)
        const range = getRange(boat)
        store.dispatch(setRange(range))
        range.forEach(tile => {
          const rangeSprite = new Sprite(resources[boatImage].texture)
          rangeSprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
          rangeSprite.position.set(tile.col * TILE_SIZE, tile.row * TILE_SIZE)
          rangeSprite.row = tile.row
          rangeSprite.col = tile.col
          rangeSprite.alpha = 0.5
          rangeSprite.interactive = true
          rangeSprite.zIndex = 101
          rangeSprite.on('click', () => {
            store.dispatch(setEnd({row: rangeSprite.row, col: rangeSprite.col}))
            commitToReel()
            rangeSprites.forEach(sprite => {
              sprite.destroy()
            })
            rangeSprites = []
          })
          rangeSprites.push(rangeSprite)
          stage.addChild(rangeSprite)
        })
      } else {
        store.dispatch(setSelectedObject({}))
        store.dispatch(setStart({}))
        rangeSprites.forEach(sprite => {
          sprite.destroy()
        })
        rangeSprites = []
        sprite.removeChild(rectangle)
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
    })

    sprite.on('mouseout', () => {
      sprite.removeChild(boatFuel)
      sprite.removeChild(boatRange)
      sprite.removeChild(fishCaught)
    })
  }
  stage.addChild(sprite)
  sprite.addChild(boatName)

  return sprite
}
