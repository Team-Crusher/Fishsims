import {Sprite, Text} from 'pixi.js'
import {stage, resources, fishesImage, justFish, justBoat} from './game'
import {TILE_SIZE} from '../script/drawMap'

const makeFishSprite = fish => {
  // add background to stage...
  // stage.addChild(background)

  // create some textures from an image path
  const nameText = new Text(fish.pop, {
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 'white',
    align: 'center'
  })
  // var justFish = PIXI.Texture.from('_assets/buttonDown.png')
  // var textureButtonOver = PIXI.Texture.from('_assets/buttonOver.png')

  // -------------------------------- create button  ----------------------

  var sprite = new Sprite(justFish)
  sprite.buttonMode = true

  sprite.anchor.set(0.5)
  sprite.position.set(fish.col * TILE_SIZE, fish.row * TILE_SIZE)

  // make the sprite interactive...
  sprite.interactive = true

  sprite
    // set the mousedown and touchstart callback...
    .on('mousedown', onButtonDown)
    .on('touchstart', onButtonDown)

    // set the mouseup and touchend callback...
    .on('mouseup', onButtonUp)
    .on('touchend', onButtonUp)
    .on('mouseupoutside', onButtonUp)
    .on('touchendoutside', onButtonUp)

    // set the mouseover callback...
    .on('mouseover', onButtonOver)

    // set the mouseout callback...
    .on('mouseout', onButtonOut)

  // add it to the stage
  stage.addChild(sprite)
  return sprite

  // -------------------------------- create button  ----------------------

  function onButtonDown() {
    console.log('heyhey')
    this.isdown = true
    this.texture = justBoat
    this.alpha = 1
  }

  function onButtonUp() {
    console.log('upup')

    this.isdown = false

    if (this.isOver) {
      this.texture = justFish
    } else {
      this.texture = justFish
    }
  }

  function onButtonOver() {
    console.log('hovering')

    this.isOver = true

    if (this.isdown) {
      return
    }

    this.texture = justFish
  }

  function onButtonOut() {
    this.isOver = false

    if (this.isdown) {
      return
    }

    this.texture = justFish
  }
}

export default makeFishSprite
