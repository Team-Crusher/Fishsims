/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'
import {keyboard, hitTestRectangle} from '../script/PIXIutils'
import store, {
  setFishes,
  setBoats,
  setFisheries,
  setActionsReel
} from '../store'
import {TILE_SIZE} from '../script/drawMap'

let type = 'WebGL'
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}

// declare globals
let Sprite = PIXI.Sprite
export let Application = PIXI.Application
export let app = new Application({
  width: window.innerHeight,
  height: window.innerHeight,
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
// const moveReel = []
let fishes1, fishes2
let renderer
let fishes = []
let fisheries = []
//let renderer
console.log(fishes)

// Keyboard binding- for testing only, real game won't use keyboard like this
const left = keyboard('ArrowLeft'),
  up = keyboard('ArrowUp'),
  right = keyboard('ArrowRight'),
  down = keyboard('ArrowDown')

/**
 * mounts pixi app and returns the needed pixi stuff
 * @param {DOMElement} mounter   where the pixi app will mount
 */
export function mount(mounter, ctx) {
  let type = 'WebGL'
  if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas'
  }

  mounter.appendChild(app.view)

  return {Application, app, loader, Sprite}
}

/**
 *  starts the game loop and adds in the sprites and stuff
 * @param {any} stuff    the collection of things returned from mount()
 */
export function start() {
  loader
    .add([boatImage, fishesImage, fisheryImage])
    .on('progress', loadProgressHandler)
    .load(setup)

  function loadProgressHandler() {
    // this can be leveraged for a loading progress bar
  }
}

function setup() {
  store.dispatch(setFishes([{x: 14, y: 18, pop: 420}, {x: 3, y: 7, pop: 9001}])) // this will happen in sockets
  fishes = store.getState().fishes

  store.dispatch(
    setFisheries([
      {x: 10, y: 10, socketId: 'testtest'},
      {x: 5, y: 5, socketId: 'testtest'}
    ])
  )
  fisheries = store.getState().fisheries
  console.log('TCL: setup -> fisheries', fisheries)

  store.dispatch(
    setBoats([
      {
        ownerSocket: '',
        ownerName: 'Fishbeard',
        sprite: null,
        x: 1,
        y: 1,
        fishes: 200,
        moveReel: []
      },
      {
        ownerSocket: '',
        ownerName: 'Nick',
        sprite: null,
        x: 5,
        y: 5,
        fishes: 200,
        moveReel: []
      },
      {
        ownerSocket: '',
        ownerName: 'Charlie',
        sprite: null,
        x: 64,
        y: 96,
        fishes: 20,
        moveReel: []
      }
    ])
  )
  // init fishes
  const fishSprites = fishes.map(fish => {
    const fishSprite = new Sprite(resources[fishesImage].texture)
    fishSprite.position.set(fish.x * TILE_SIZE, fish.y * TILE_SIZE)
    fishSprite.quantity = fish.pop
    console.log('about to add fish to child')
    app.stage.addChild(fishSprite)
    return fishSprite
  })

  // init fisheries
  console.log(fisheries)

  const fisheriesSprites = fisheries.map(fishery => {
    const fisherySprites = new Sprite(resources[fisheryImage].texture)
    fisherySprites.position.set(fishery.x * TILE_SIZE, fishery.y * TILE_SIZE)
    fisherySprites.socketId = fishery.socketId
    fisherySprites.interactive = true
    fisherySprites.buttonMode = true
    fisherySprites.anchor.set(0.5)
    fisherySprites
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)
      .on('pointermove', onDragMove)

    // For mouse-only events
    // .on('mousedown', onDragStart)

    app.stage.addChild(fisherySprites)
    return fisherySprites
  })

  /**
   * functions for dragging and moving
   */
  function onDragStart(event) {
    console.log('position From: \t', event.data.global)
    this.data = event.data
    this.alpha = 0.5
    this.dragging = true
  }

  function onDragEnd(event) {
    console.log('position To: \t', event.data.global)

    this.alpha = 1
    this.dragging = false
    // set the interaction data to null
    this.data = null
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent)
      this.x = newPosition.x
      this.y = newPosition.y
    }
  }

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
  // console.log('<>< COMPUTER TURN <><')

  const actionsReel = store.getState().actionsReel
  if (actionsReel.length > 0) {
    switch (actionsReel[0].reelActionType) {
      case 'boatMove':
        actionsReelBoatMove(actionsReel[0].object)
        break
      case 'boatBuy':
        // placeholder for showing a player's boat buy
        break
      default:
        // no action
        break
    }
  } else {
    // emit to the server that you're done watching actionsReel.
  }

  function actionsReelBoatMove(boat) {
    const moveReel = boat.moveReel

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
      const updatedActionsReel = store.getState().actionsReel.slice(1)
      store.dispatch(setActionsReel(updatedActionsReel))
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
