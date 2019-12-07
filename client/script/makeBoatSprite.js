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
  clearArrows
} from './utils'

export const makeBoatSprite = boat => {
  let isSelected = false
  const sprite = new Sprite(resources[`${boat.ownerSocket}BOAT`].texture)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.parentId = boat.id
  sprite.zIndex = 9001
  sprite.position.set(boat.x, boat.y)
  let rangeTiles = []
  socket.emit('get-boat-name', boat.id)

  // will be used later for mouseover boat info
  let rectangleUnderText
  let fishCaught
  let boatRange
  let boatCapacity

  if (boat.ownerSocket === socket.id) {
    sprite.interactive = true
    sprite.buttonMode = true

    //highlight your boat with red transparent highlight
    const yourBoat = new Graphics()
    yourBoat.beginFill(0xff1100, 0.2)
    yourBoat.drawRect(0, 0, 32, 32)
    yourBoat.endFill()
    sprite.addChild(yourBoat)

    sprite.on('click', () => {
      isSelected = !isSelected
      if (isSelected) {
        store.dispatch(setSelectedObject(boat))
        store.dispatch(
          setStart({row: boat.y / TILE_SIZE, col: boat.x / TILE_SIZE})
        )
        if (store.getState().arrow.length) {
          clearArrows()
          store.dispatch(setArrow([]))
        }
        const range = getRange(boat)
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
            store.getState().arrow.forEach(a => stage.addChild(a))
            rangeTiles.forEach(t => {
              t.destroy()
            })
            rangeTiles = []
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
        rangeTiles = []
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
      rectangleUnderText.zIndex = 9000
      rectangleUnderText.y -= 30
      rectangleUnderText.x += 25

      const textStyle = {
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 'black',
        align: 'center',
        anchor: 0.5
      }

      boatRange = new Text(`Max Range: ${boat.maxDistance}`, textStyle)
      boatRange.zIndex = 9000
      boatRange.x += 30
      boatRange.y -= 25

      boatCapacity = new Text(`Capacity: ${boat.capacity}`, textStyle)
      boatCapacity.zIndex = 9000
      boatCapacity.x += 30
      boatCapacity.y -= 10

      fishCaught = new Text(
        `🐟 Shallow: ${boatfish.fishes.shallows}, Deep: ${
          boatfish.fishes.deep
        }, Open Ocean: ${boatfish.fishes.openOcean}`,
        textStyle
      )
      fishCaught.zIndex = 9000
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
