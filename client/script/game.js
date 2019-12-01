/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'
import {keyboard, hitTestRectangle} from '../script/PIXIutils'
import {makeFisherySprite} from '../script/makeFisherySprite'
import makeMapSprite from '../script/makeMapSprite'

import store, {
  setFishes,
  addBoat,
  setFisheries,
  setServerActionsReel,
  setPixiGameState
} from '../store'
import socket from '../socket'
import {TILE_SIZE} from '../script/drawMap'

// declare globals
let Sprite = PIXI.Sprite
export let Application = PIXI.Application
export let app = new Application({
  width: 65 * TILE_SIZE, // window.innerHeight,
  height: 65 * TILE_SIZE, // window.innerHeight,
  transparent: true
})
export let stage = app.stage
export let loader = app.loader
export let resources = loader.resources

// bind resource names here, so we don't keep having to use the spritePath variable
export const spritePath = 'assets'
export const boatImage = `${spritePath}/boat.png`
export const fishesImage = `${spritePath}/fishes.png`
export const fisheryImage = `${spritePath}/fishery.png`

// TODO move all of these to the store
let fishes1, fishes2
// const moveReel = []
let fishes = []
let fisheries = []

// Keyboard binding- for testing only, real game won't use keyboard like this
const left = keyboard('ArrowLeft'),
  up = keyboard('ArrowUp'),
  right = keyboard('ArrowRight'),
  down = keyboard('ArrowDown')

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
  loader
    .add([boatImage, fishesImage, fisheryImage])
    .add('map', mapData)
    .on('progress', loadProgressHandler)
    .load(setup)

  function loadProgressHandler() {
    // this can be leveraged for a loading progress bar
  }
}

function setup() {
  stage.addChild(makeMapSprite())

  //TODO : move to sockets, generate based on water tiles
  store.dispatch(setFishes([{x: 5, y: 5, pop: 420}, {x: 3, y: 7, pop: 9001}]))
  fishes = store.getState().fishes

  // Keep this here unless we find a better fix for the mount issue;
  // all pixi-related stuff is undefined before this file is run.
  fisheries = store
    .getState()
    .fisheries.map(
      fishery =>
        !fishery.sprite
          ? {...fishery, sprite: makeFisherySprite(fishery)}
          : fishery
    )
  console.log('TCL: setup -> fisheries', fisheries)

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
  // console.log('<>< PLAYER TURN <><')
  const selectedObject = store.getState().selectedObject
  // console.log('Whose boat is selected? ', selectedObject.ownerName)
  const moveReel = selectedObject.moveReel

  // *** MOVEMENT REEL ************************************************
  // if boat is stationary, its next move is relative to its current position.
  // else, adding moves to the reel must set target coords based on the last move in the reel.
  left.press = () => {
    moveReel.push(
      moveReel.length
        ? {
            targetX: moveReel[moveReel.length - 1].targetX - TILE_SIZE,
            targetY: moveReel[moveReel.length - 1].targetY
          }
        : {
            targetX: selectedObject.x - TILE_SIZE,
            targetY: selectedObject.y
          }
    )
  }

  right.press = () => {
    moveReel.push(
      moveReel.length
        ? {
            targetX: moveReel[moveReel.length - 1].targetX + TILE_SIZE,
            targetY: moveReel[moveReel.length - 1].targetY
          }
        : {
            targetX: selectedObject.x + TILE_SIZE,
            targetY: selectedObject.y
          }
    )
  }

  up.press = () => {
    moveReel.push(
      moveReel.length
        ? {
            targetX: moveReel[moveReel.length - 1].targetX,
            targetY: moveReel[moveReel.length - 1].targetY - TILE_SIZE
          }
        : {
            targetX: selectedObject.x,
            targetY: selectedObject.y - TILE_SIZE
          }
    )
  }

  down.press = () => {
    moveReel.push(
      moveReel.length
        ? {
            targetX: moveReel[moveReel.length - 1].targetX,
            targetY: moveReel[moveReel.length - 1].targetY + TILE_SIZE
          }
        : {
            targetX: selectedObject.x,
            targetY: selectedObject.y + TILE_SIZE
          }
    )
  }
}

export function computerTurn() {
  const serverActionsReel = store.getState().serverActionsReel
  if (serverActionsReel.length > 0) {
    const currentReelFrame = serverActionsReel[0]
    switch (currentReelFrame.reelActionType) {
      case 'boatMove':
        const boatToMove = store
          .getState()
          .boats.filter(b => b.id === currentReelFrame.objectId)[0]
        actionsReelBoatMove(boatToMove, currentReelFrame.reelActionDetail)
        break
      case 'boatBuy':
        // 1: check if this boat exists yet in local boats store.
        // (it only will for boats this player created)
        // if not- dispatch to store to create it with the details in the action
        // (this is necessary in order to render new boats from other players)

        if (
          !store
            .getState()
            .boats.filter(b => b.id === currentReelFrame.objectId)[0]
        ) {
          const {
            objectId,
            playerName,
            reelActionDetail,
            socketId
          } = currentReelFrame
          const boatX = reelActionDetail.x
          const boatY = reelActionDetail.y

          store.dispatch(addBoat(objectId, socketId, playerName, boatX, boatY))
        }

        // 3: dispense of this actionsReel frame and move on
        const updatedServerActionsReel = store
          .getState()
          .serverActionsReel.slice(1)
        store.dispatch(setServerActionsReel(updatedServerActionsReel))
        break
      default:
        // no action
        break
    }
  } else {
    socket.emit('reel-finished')
    store.dispatch(setPixiGameState('waitForNextTurn'))
  }

  function actionsReelBoatMove(boat, reel) {
    const moveReel = reel

    if (moveReel.length > 0) {
      // set boat's target to the first frame in the moveReel
      const targetX = moveReel[0].targetX
      const targetY = moveReel[0].targetY

      // speed is set to 0.5 for nice slow movement; higher for faster testing
      boat.vx = Math.sign(targetX - boat.x) * 0.5
      boat.vy = Math.sign(targetY - boat.y) * 0.5

      if (boat.x !== targetX || boat.y !== targetY) {
        // Move the boat until it reaches the destination for this moveReel frame.
        // VERY IMPORTANT and we may want to handle this with having the gameState
        // script run individual entities' own state scripts each frame - not only
        // do you need the boat pbject to move, you need to make sure its sprite
        // moves with it
        boat.x += boat.vx
        boat.sprite.x = boat.x
        boat.y += boat.vy
        boat.sprite.y = boat.y
      } else {
        // stop the boat & dispose of this moveReel frame
        boat.vx = 0
        boat.vy = 0
        moveReel.shift()
      }
    } else {
      // dispense of this actionsReel frame and move on
      const updatedServerActionsReel = store
        .getState()
        .serverActionsReel.slice(1)
      store.dispatch(setServerActionsReel(updatedServerActionsReel))
    }

    fishes.forEach(fish => {
      if (hitTestRectangle(boat, fish)) {
        // begin collecting fish
        if (fish.quantity > 0) {
          boat.fishes++
          fish.quantity--
        } else {
          app.stage.removeChild(fish)
        }
        console.log(
          'boat fishes: ',
          boat.fishes,
          'fishes1 qty: ',
          fishes1.quantity,
          'fishes2 qty: ',
          fishes2.quantity
        )
      } else {
        // There's no collision
      }
    })
  }
}

export function waitForNextTurn() {}
