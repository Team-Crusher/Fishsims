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
//import {getWater, getWaterNeighbors} from '../../utilityMethods.js'
export let rangeTiles = []

export function clearRange() {
  while (rangeTiles.length) {
    rangeTiles.pop().destroy()
  }
}

export const makeBoatSprite = boat => {
  //  const playerColor = rgbToHex(
  const sprite = new Sprite(resources[`${boat.ownerSocket}BOAT`].texture)
  sprite.isSelected = false
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.zIndex = 9001
  sprite.position.set(boat.x, boat.y)

  //----------------------------Create boat text & shapes ----------------------

  //highlight your boat with red transparent highlight
  const yourBoat = new Graphics()
  yourBoat.beginFill(0xff1100, 0.2)
  yourBoat.drawRect(0, 0, 32, 32)
  yourBoat.endFill()

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

  // TODO make smae across clients
  socket.emit('get-boat-name', boat.id)

  const boatRange = new Text(`Max Range: ${boat.maxDistance}`, textStyle)
  const boatCapacity = new Text(`Capacity: ${boat.capacity}`, textStyle)

  boatRange.x += 30
  boatRange.y -= 25

  boatCapacity.x += 30
  boatCapacity.y -= 10

  rectangleUnderText.y -= 30
  rectangleUnderText.x += 25
  //----------------------------End creating boat text ------------------------

  if (boat.ownerSocket === socket.id) {
    sprite.interactive = true
    sprite.buttonMode = true
    sprite.addChild(yourBoat)

    sprite.on('click', () => {
      sprite.isSelected = !sprite.isSelected
      if (sprite.isSelected) {
        store.dispatch(setSelectedObject(boat))
        store.dispatch(
          setStart({row: boat.y / TILE_SIZE, col: boat.x / TILE_SIZE})
        )
        const range = getRange(boat)
        clearRange() // only select one boat at once
        range.forEach(tile => {
          const traversable = new Graphics()
          traversable.beginFill(0x800080, 0.3) // Color it black
          traversable.drawRect(0, 0, 32, 32)
          traversable.endFill()
          traversable.position.set(tile.col * TILE_SIZE, tile.row * TILE_SIZE)
          traversable.row = tile.row
          traversable.col = tile.col
          traversable.alpha = 0.5
          traversable.interactive = true
          traversable.zIndex = 101
          rangeTiles.push(traversable)
          stage.addChild(traversable)

          traversable.on('click', () => {
            store.dispatch(setEnd({row: traversable.row, col: traversable.col}))
            commitToReel()
            clearRange()
            store.dispatch(removeSelectedObject({sprite}))
            sprite.isSelected = !sprite.isSelected
          })
        })
      } else {
        store.dispatch(removeSelectedObject())
        store.dispatch(setStart({}))
        rangeTiles.forEach(tile => {
          tile.destroy()
        })
        rangeTiles = []
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

      sprite.addChild(boatCapacity)
      sprite.addChild(boatRange)
      sprite.addChild(fishCaught)
      sprite.addChild(rectangleUnderText)
    })

    sprite.on('mouseout', () => {
      sprite.removeChild(boatCapacity)
      sprite.removeChild(boatRange)
      sprite.removeChild(fishCaught)
      sprite.removeChild(rectangleUnderText)
    })
  }
  stage.addChild(sprite)

  return sprite
}

function makeBoatHighlight(boatSprite) {}
