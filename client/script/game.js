/* eslint-disable guard-for-in */
/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'
import {Viewport} from 'pixi-viewport'
import makeFisherySprite from './sprites/makeFisherySprite'
import makeFishSprite from './sprites/makeFishSprite'
import makeMapSprite from './sprites/mapSprite'
import socket from '../socket'
import {ifOnFishCollect} from './utils/ifOnFishCollect'
import {boatInRangeOfDock} from './utils/boatInRangeOfDock'
const {TILE_SIZE, FISH_VALUES} = require('./CONSTANTS')

import store, {
  addBoat,
  setPixiGameState,
  adjustMoney,
  removeActionFromReel
} from '../store'
import {populateDecorationSprites} from './sprites'

// declare globals
let Sprite = PIXI.Sprite
let Text = PIXI.Text
export let Application = PIXI.Application
export let app = new Application({
  width: 65 * TILE_SIZE, // window.innerHeight,
  height: 65 * TILE_SIZE, // window.innerHeight,
  transparent: true
})

// --------------------- create pixi-viewport ---------------------

export const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  //pixiapp width & height = 65 * 32(tile size) = 2080px
  worldWidth: 2200,
  worldHeight: 2200,
  interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
})
// add the viewport to the stage
app.stage.addChild(viewport)

// activate plugins
viewport
  .drag()
  .pinch()
  .wheel()
  .clampZoom({maxWidth: 115 * TILE_SIZE})
  .clamp({
    left: -30 * TILE_SIZE,
    right: 95 * TILE_SIZE,
    bottom: 75 * TILE_SIZE,
    top: -10 * TILE_SIZE,
    underflow: 'center'
  })

//  .decelerate()

// --------------------- end Viewport setup ---------------------

export let stage = viewport
export let loader = app.loader
export let resources = loader.resources
stage.sortableChildren = true

// bind resource names here, so we don't keep having to use the spritePath variable
export const spritePath = 'assets'
export const boatImage = `${spritePath}/boat.png`
export const fishesShallows = `${spritePath}/fishes-shallows.png`
export const fishesOpenOcean = `${spritePath}/fishes-openOcean.png`
export const fishesDeep = `${spritePath}/fishes-deep.png`
export const arrowSheet = `${spritePath}/arrow.json`
export const decoSheet = `${spritePath}/decorations.json`
export const fisheryImage = `${spritePath}/fishery.png`
export const dubloon = `${spritePath}/dubloon.png`

import {addBoatsToLoader, clearArrow} from './utils'
import makeCloudSprite from './sprites/cloudSprite'

let fishes = []
let fisheries = []

/**
 * mounts pixi app and returns the needed pixi stuff
 * @param {DOMElement} mounter   where the pixi app will mount
 */
export function mount(mounter) {
  let type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas'
  mounter.appendChild(app.view)
  return {Application, app, loader, Sprite}
}

/**
 *  starts the game loop and adds in the sprites and stuff
 * @param {any} stuff    the collection of things returned from mount()
 */
export function start(mapData) {
  addBoatsToLoader(loader)
  loader
    .add([
      boatImage,
      fishesShallows,
      fishesOpenOcean,
      fishesDeep,
      fisheryImage,
      dubloon
    ])
    .add('cloud', `${spritePath}/cloud.png`)
    .add('map', mapData)
    .add(decoSheet)
    .add(arrowSheet)
    .on('progress', loadProgressHandler)
    .load(setup)

  function loadProgressHandler() {
    // this can be leveraged for a loading progress bar
  }
}

function setup() {
  viewport.addChild(makeMapSprite())
  viewport.addChild(makeCloudSprite())
  populateDecorationSprites()

  fishes = store.getState().fishes
  // Keep this here unless we find a better fix for the mount issue;
  // all pixi-related stuff is undefined before this file is run.
  fishes = store
    .getState()
    .fishes.map(
      fish => (!fish.sprite ? {...fish, sprite: makeFishSprite(fish)} : fish)
    )

  fisheries = store.getState().fisheries.map(fishery => {
    if (!fishery.sprite) {
      return {...fishery, sprite: makeFisherySprite(fishery)}
    }
    return fishery
  })

  const oneOfMyFisheries = fisheries.filter(f => f.pId === socket.id)[0]
  viewport.moveCenter(
    oneOfMyFisheries.col * TILE_SIZE,
    oneOfMyFisheries.row * TILE_SIZE
  )
  /**
   * functions for dragging and moving
   */
  // start a 60fps game cycle
  app.ticker.add(() => gameLoop())

  // animation loop- 60fps
  function gameLoop() {
    // 60 times per second, run the function for the current gamestate
    const pixiGameState = store.getState().pixiGameState

    switch (pixiGameState) {
      case 'playerTurn':
        return playerTurn()
      case 'computerTurn':
        return computerTurn()
      case 'waitForNextTurn':
        return waitForNextTurn()
      default:
        return playerTurn()
    }
  }
}

export function playerTurn() {
  // nothing here yet
}

function actionsReelBoatMove(boat, reel) {
  const {reelActionDetail, objectId, reelActionType} = reel

  if (reelActionDetail.length > 0) {
    const targetX = reelActionDetail[0][0] * TILE_SIZE
    const targetY = reelActionDetail[0][1] * TILE_SIZE

    if (boat.x !== targetX || boat.y !== targetY) {
      // Move the boat until it reaches the destination for this moveReel frame.
      boat.vx = Math.sign(targetX - boat.x) * 2
      boat.vy = Math.sign(targetY - boat.y) * 2

      boat.x += boat.vx
      boat.sprite.x = boat.x
      boat.y += boat.vy
      boat.sprite.y = boat.y
    } else {
      boat.vx = 0
      boat.vy = 0
      reelActionDetail.shift()
    }
  } else {
    clearArrow(objectId)
    store.dispatch(removeActionFromReel(objectId + reelActionType))
  }
}

function findBoat(id) {
  return store.getState().boats.filter(b => b.id === id)[0]
}

function readReel(serverActionsReel) {
  const keys = Object.keys(serverActionsReel)
  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      const currentReelFrame = Object.values(serverActionsReel)[i]
      switch (currentReelFrame.reelActionType) {
        case 'boatMove': {
          const boatToMove = findBoat(currentReelFrame.objectId)
          try {
            actionsReelBoatMove(boatToMove, currentReelFrame)
          } catch (e) {
            console.log('THERE WAS A BOAT ERROR:\t', e)
            const {
              reelActionDetail,
              objectId,
              reelActionType
            } = currentReelFrame
            reelActionDetail.shift()
            store.dispatch(removeActionFromReel(objectId + reelActionType))
          }
          // viewport.moveCenter(boatToMove.x, boatToMove.y)
          break
        }
        case 'boatBuy': {
          const {
            reelActionType,
            objectId,
            playerName,
            reelActionDetail,
            socketId
          } = currentReelFrame
          if (!findBoat(currentReelFrame.objectId)) {
            const boatX = reelActionDetail.x
            const boatY = reelActionDetail.y

            store.dispatch(
              addBoat(objectId, socketId, playerName, boatX, boatY)
            )
          }
          store.dispatch(removeActionFromReel(objectId + reelActionType)) // remove by it's actionKey
          break
        }
        default: {
          break
        }
      }
    }
  } else {
    const allBoats = store.getState().boats

    // At the end of actionReel, check for all boats on fishes and have them collect
    allBoats.forEach(boat => {
      ifOnFishCollect(boat, fishes)
    })

    // At the end of actionReel, check for boats near fisheries to have them cash in
    fisheries.filter(f => f.pId === socket.id).forEach(fishery => {
      allBoats.filter(b => b.ownerSocket === socket.id).forEach(boat => {
        if (boatInRangeOfDock(boat, fishery)) {
          let dubloonsCollected = 0
          for (let key in boat.fishes) {
            if (boat.fishes[key] > 0) {
              dubloonsCollected += FISH_VALUES[key] * boat.fishes[key]
              boat.fishes[key] = 0
            }
          }

          if (dubloonsCollected) {
            store.dispatch(adjustMoney(dubloonsCollected))

            // Add Pixi Text for fish turn in! Woo!
            let dubloonIcon = new Sprite(resources[dubloon].texture)
            let fishSold = new Text(`+ ${dubloonsCollected}`, {
              fontFamily: 'Arial',
              fontSize: 12,
              fill: 'black',
              align: 'center',
              anchor: 0.5
            })

            dubloonIcon.x += 0
            dubloonIcon.zIndex = 9001
            dubloonIcon.y -= 22
            dubloonIcon.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

            fishSold.resolution = 4
            fishSold.zIndex = 9001
            fishSold.x += 26
            fishSold.y -= 12

            boat.sprite.addChild(dubloonIcon)
            boat.sprite.addChild(fishSold)

            let fishSoldInterval
            fishSoldInterval = window.setInterval(() => {
              dubloonIcon.y -= 0.5
              dubloonIcon.alpha -= 0.025
              fishSold.y -= 0.5
              fishSold.alpha -= 0.025
              if (dubloonIcon.alpha <= 0) {
                clearInterval(fishSoldInterval)
                boat.sprite.removeChild(dubloonIcon)
                boat.sprite.removeChild(fishSold)

                // clear references to sprites so they can be garbage collected
                dubloonIcon = null
                fishSold = null
              }
            }, 50)

            if (boat.maxFishesText) {
              boat.maxFishesText.destroy()
              boat.maxFishesText = null
            }
          }
        }
      })
    })

    // tell server you're done watching the reel & wait for others to finish
    // Send player data, which includes your dubloons
    socket.emit('reel-finished', store.getState().player)
    store.dispatch(setPixiGameState('waitForNextTurn'))
  }
}

export function computerTurn() {
  readReel(store.getState().serverActionsReel)
}

export function waitForNextTurn() {}
