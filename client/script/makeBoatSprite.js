/* eslint-disable max-statements */
import {Sprite, Text, Graphics, SCALE_MODES} from 'pixi.js'
import {stage, resources, boatImage} from './game'
import store, {
  setSelectedObject,
  removeSelectedObject,
  setStart,
  setEnd,
  setArrow
} from '../store'
import {TILE_SIZE, SEA_LEVEL} from './CONSTANTS.js'
import socket from '../socket'
import {
  getRange,
  commitToReel,
  rgbToHex,
  setBoatName,
  clearAllArrows
} from './utils'
import {clearRange, makeBoatHighlight} from './sprites/boatMoveHighlight'
//import {getWater, getWaterNeighbors} from '../../utilityMethods.js'

export const makeBoatSprite = boat => {
  //  const playerColor = rgbToHex(
  const sprite = new Sprite(resources[`${boat.ownerSocket}BOAT`].texture)
  sprite.interactiveChildren = false
  sprite.isSelected = false
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.parentId = boat.id
  sprite.zIndex = 9001
  sprite.position.set(boat.x, boat.y)

  //----------------------------Create boat text & shapes ----------------------

  //highlight your boat with red transparent highlight
  let yourBoat = new Graphics()
  yourBoat.beginFill(0xff1100, 0.2)
  yourBoat.drawRect(0, 0, 32, 32)
  yourBoat.endFill()
  sprite.addChild(yourBoat)

  const textStyle = {
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 'black',
    align: 'center',
    anchor: 0.5
  }

  // TODO make same across clients
  socket.emit('get-boat-name', boat.id)

  // will be used later for mouseover boat info
  let rectangleUnderText
  let fishCaught
  let boatRange
  let boatCapacity
  //----------------------------End creating boat text ------------------------

  if (boat.ownerSocket === socket.id) {
    sprite.interactive = true
    sprite.buttonMode = true

    sprite.on('click', () => {
      sprite.isSelected = !sprite.isSelected
      if (sprite.isSelected) {
        clearRange()
        store.dispatch(setSelectedObject(boat))
        store.dispatch(
          setStart({row: boat.y / TILE_SIZE, col: boat.x / TILE_SIZE})
        )
        makeBoatHighlight(boat.x, boat.y, boat.maxDistance, sprite)
      } else {
        console.log('HELLO')
        store.dispatch(removeSelectedObject())
        store.dispatch(setStart({}))
      }
    })

    sprite.on('mouseover', () => {
      //declare fish here because otherwise cant access store
      let boatfish = store
        .getState()
        .boats.filter(b => b.id === sprite.parentId)[0]

      //create PIXI graphic components
      rectangleUnderText = new Graphics()
      rectangleUnderText.beginFill(0xffffff, 0.05) // Color it black
      rectangleUnderText.drawRect(0, 0, 220, 55)
      rectangleUnderText.endFill()
      rectangleUnderText.zIndex = 9002
      rectangleUnderText.y -= 30
      rectangleUnderText.x += 25

      boatRange = new Text(`Max Range: ${boat.maxDistance}`, textStyle)
      boatRange.zIndex = 9002
      boatRange.x += 30
      boatRange.y -= 25
      boatRange.resolution = 5

      boatCapacity = new Text(`Capacity: ${boat.capacity}`, textStyle)
      boatCapacity.zIndex = 9002
      boatCapacity.x += 30
      boatCapacity.y -= 10
      boatCapacity.resolution = 5

      fishCaught = new Text(
        `🐟 Shallow: ${boatfish.fishes.shallows}, Deep: ${
          boatfish.fishes.deep
        }, Open Ocean: ${boatfish.fishes.openOcean}`,
        textStyle
      )
      fishCaught.resolution = 5
      fishCaught.zIndex = 9002
      fishCaught.x += 30
      fishCaught.y += 5

      sprite.addChild(rectangleUnderText)
      sprite.addChild(boatRange)
      sprite.addChild(boatCapacity)
      sprite.addChild(fishCaught)
    })

    sprite.on('mouseout', () => {
      sprite.removeChild(boatCapacity)
      sprite.removeChild(boatRange)
      sprite.removeChild(fishCaught)
      sprite.removeChild(rectangleUnderText)
      boatCapacity = null
      boatRange = null
      fishCaught = null
      rectangleUnderText = null
    })
  }
  stage.addChild(sprite)

  return sprite
}
