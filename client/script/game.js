/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'
import {keyboard, hitTestRectangle} from '../script/PIXIutils'
import store, {setFishes, setBoats} from '../store'
import {TILE_SIZE} from '../script/drawMap'

let type = 'WebGL'
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}

// declare globals
const Sprite = PIXI.Sprite
export let pixiGameState
// export let island_scene
export const Application = PIXI.Application
export const app = new Application({width: 768, height: 640})
export const stage = app.stage
export const loader = app.loader
export const resources = loader.resources

// bind resource names here, so we don't keep having to use the spritePath variable
export const spritePath = 'assets'
export const islandImage = `${spritePath}/island_scene.gif`
export const boatImage = `${spritePath}/boat.png`
export const fishesImage = `${spritePath}/fishes.png`

// TODO move all of these to the store
const moveReel = []
let boat, fishes1, fishes2
let renderer
let fishes = []

/**
 * mounts pixi app and returns the needed pixi stuff
 * @param {DOMElement} mounter   where the pixi app will mount
 */
export function mount(mounter) {
  mounter.appendChild(app.view)

  return {Application, app, loader, Sprite}
}

/**
 *  starts the game loop and adds in the sprites and stuff
 * @param {any} stuff    the collection of things returned from mount()
 */
export function start() {
  loader
    .add([islandImage, boatImage, fishesImage])
    .on('progress', loadProgressHandler)
    .load(setup)

  function loadProgressHandler() {
    // this can be leveraged for a loading progress bar
  }
}

function setup() {
  // create a Sprite from a texture
  const islandSceneSprite = new Sprite(resources[islandImage].texture)
  islandSceneSprite.zOrder = -5000
  app.stage.addChild(islandSceneSprite)

  store.dispatch(setFishes([{x: 14, y: 18, pop: 420}, {x: 3, y: 7, pop: 9001}])) // this will happen in sockets
  fishes = store.getState().fishes

  // init fishes
  const fishSprites = fishes.map(fish => {
    const fishSprite = new Sprite(resources[fishesImage].texture)
    fishSprite.position.set(fish.x * TILE_SIZE, fish.y * TILE_SIZE)
    fishSprite.quantity = fish.pop
    app.stage.addChild(fishSprite)
    return fishSprite
  })

  // boat = new Sprite(resources[boatImage].texture)
  // app.stage.addChild(boat)

  store.dispatch(
    setBoats([
      {
        ownerSocket: '',
        ownerName: 'Fishbeard',
        sprite: null,
        x: 32,
        y: 32,
        fishes: 200,
        moveReel: []
      },
      {
        ownerSocket: '',
        ownerName: 'Nick',
        sprite: null,
        x: 96,
        y: 128,
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

  const boats = store.getState().boats
  boat = boats[0]

  keyboardMount()
  // init the gamestate to 'play'. Gameloop will run the current gamestate as a fn
  pixiGameState = play

  // start a 60fps game cycle
  app.ticker.add(() => gameLoop())

  // animation loop- 60fps
  function gameLoop() {
    // 60 times per second, run the function bound to pixi game state
    pixiGameState()
  }
}

function play() {
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

function keyboardMount() {
  //capture keyboard arrow keys for moving the boat, for now
  let left = keyboard('ArrowLeft'),
    up = keyboard('ArrowUp'),
    right = keyboard('ArrowRight'),
    down = keyboard('ArrowDown')

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
            targetX: boat.x - TILE_SIZE,
            targetY: boat.y
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
            targetX: boat.x + TILE_SIZE,
            targetY: boat.y
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
            targetX: boat.x,
            targetY: boat.y - TILE_SIZE
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
            targetX: boat.x,
            targetY: boat.y + TILE_SIZE
          }
    )
  }
}
