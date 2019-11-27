/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'
import {keyboard, hitTestRectangle} from '../script/PIXIutils'
import {TILE_SIZE} from '../script/drawMap'
import store, {setFishes} from '../store'

// declare globals
export let Application
export let app
export let loader
export let resources
export let Sprite
export let pixiGameState
export let island_scene
export let spritePath = 'assets'

const moveReel = [] //move to store
let boat, fishes1, fishes2 // move to store
let fishes = []
console.log(fishes)

/**
 * mounts pixi app and returns the needed pixi stuff
 * @param {DOMElement} mounter   where the pixi app will mount
 */
export function mount(mounter) {
  let type = 'WebGL'
  if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas'
  }

  // Aliases for DRY code
  Application = PIXI.Application
  app = new Application({width: 768, height: 640})
  loader = app.loader
  Sprite = PIXI.Sprite
  resources = loader.resources

  mounter.appendChild(app.view)

  return {Application, app, loader, Sprite}
}

/**
 *  starts the game loop and adds in the sprites and stuff
 * @param {any} stuff    the collection of things returned from mount()
 */
export function start() {
  loader
    .add([
      `${spritePath}/island_scene.gif`,
      `${spritePath}/boat.png`,
      `${spritePath}/fishes.png`
    ])
    .on('progress', loadProgressHandler)
    .load(setup)

  function loadProgressHandler() {
    // this can be leveraged for a loading progress bar
  }

  // declare to-be-Sprite names outside setup() so they can be reused in various fns

  // init an empty array for storing all fishes
}

function setup() {
  // create a Sprite from a texture

  island_scene = new Sprite(resources[`${spritePath}/island_scene.gif`].texture)
  boat = new Sprite(resources[`${spritePath}/boat.png`].texture)

  store.dispatch(
    setFishes(
      [{x: 14, y: 18, pop: 420}, {x: 3, y: 7, pop: 9001}],
      resources,
      spritePath
    )
  )
  fishes = store.getState().fishes

  // init boat
  boat.position.set(32, 32)
  boat.fishes = 0
  boat.vx = 0
  boat.vy = 0

  // init fishes
  console.log(fishes)

  fishes.forEach(fish => {
    fish.sprite.position.set(fish.x * TILE_SIZE, fish.y * TILE_SIZE)
    fish.sprite.quantity = fish.pop
    console.log('before adding fish: ', app.stage)
    app.stage.addChild(fish.sprite)
    console.log('after adding fish: ', app.stage)
  })

  app.stage.addChild(island_scene)
  //  app.stage.addChild(fishes1)
  //  app.stage.addChild(fishes2)
  app.stage.addChild(boat)

  // add a menu child to the app.stage
  // make menu a container
  // create button sprites for like.. buy boat, end turn
  // append button sprites to menu container

  // init an empty array for capturing move reel
  // moveReel = []

  keyboardMount(moveReel)
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
  // if(thing){
  //   pixiGameState = otherState;
  // }
  if (moveReel.length > 0) {
    // set boat's target to the first frame in the moveReel
    const targetX = moveReel[0].targetX
    const targetY = moveReel[0].targetY

    // speed is set to 0.5 for nice slow movement; higher for faster testing
    boat.vx = Math.sign(targetX - boat.x) * 0.5
    boat.vy = Math.sign(targetY - boat.y) * 0.5

    // useful console logs to see wassup
    // console.log(moveReel[0])
    // console.log('targetX ', targetX, 'targetY', targetY )
    // console.log('boat x ', boat.x, 'boat y', boat.y)
    // console.log('boat vx ', boat.vx, 'boat vy, ', boat.vy)

    if (boat.x !== targetX || boat.y !== targetY) {
      // move the boat until it reaches the destination for this moveReel frame
      boat.x += boat.vx
      boat.y += boat.vy
    } else {
      // stop the boat & dispose of this moveReel frame
      boat.vx = 0
      boat.vy = 0
      moveReel.shift()
    }
  }

  // ***********************************
  // TO DO!! - in FishSim, we can add a hitTestRectangle(spriteOne,
  // spriteTwo) to detect collision of boat & fishes

  /*  fishes.forEach(fish => {
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
     })*/
}

function keyboardMount(moveReel) {
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

// function updateFish(state){
//   fish = state.fish
// }
