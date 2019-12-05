/* eslint-disable max-statements */
import {Sprite, Text, Graphics, SCALE_MODES} from 'pixi.js'
import {stage, resources, boatImage} from './game'
import store, {
  setSelectedObject,
  removeSelectedObject,
  setStart,
  setEnd,
  setRange
} from '../store'
import {TILE_SIZE, SEA_LEVEL} from './CONSTANTS.js'
import socket from '../socket'
import {getRange, commitToReel, rgbToHex, setBoatName} from './utils'
//import {getWater, getWaterNeighbors} from '../../utilityMethods.js'

export const makeBoatSprite = boat => {
  let isSelected = false
  //  const playerColor = rgbToHex(
  const sprite = new Sprite(resources[`${boat.ownerSocket}BOAT`].texture)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.zIndex = 9001
  sprite.position.set(boat.x, boat.y)
  let rangeTiles = []

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

  // TODO make smae across clients
  socket.emit('get-boat-name', boat.id)

  const boatRange = new Text(`Max Range: ${boat.maxDistance}`, textStyle)
  const boatFuel = new Text(`Fuel: ${boat.fuel}`, textStyle)

  boatRange.x += 30
  boatRange.y -= 25

  boatFuel.x += 30
  boatFuel.y -= 10

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
        sprite.addChild(selectedHighlight)

        const range = getRange(boat)
        store.dispatch(setRange(range)) // TODO remove?
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
            rangeTiles.forEach(t => {
              t.destroy()
            })
            rangeTiles = []
            sprite.removeChild(selectedHighlight)
            store.dispatch(removeSelectedObject())
            isSelected = !isSelected
          })
        })
      } else {
        store.dispatch(removeSelectedObject())
        store.dispatch(setStart({}))
        rangeTiles.forEach(tile => {
          tile.destroy()
        })
        /* rangeSprites.forEach(sprite => {
         *   sprite.destroy()
         * })
         *rangeSprites = [] */
        rangeTiles = []
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

  return sprite
}
