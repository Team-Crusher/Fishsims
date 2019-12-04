import {Sprite, Text, SCALE_MODES} from 'pixi.js'
import {
  stage,
  resources,
  fishesShallows,
  fishesOpenOcean,
  fishesDeep
} from './game'
import {TILE_SIZE} from './drawMap'
import store from '../store'

const makeFishSprite = fish => {
  // create shallow fish
  let sprite
  if (fish.fishType === 'shallows') {
    sprite = new Sprite(resources[fishesShallows].texture)
  } else if (fish.fishType === 'openOcean') {
    sprite = new Sprite(resources[fishesOpenOcean].texture)
  } else if (fish.fishType === 'deep') {
    sprite = new Sprite(resources[fishesDeep].texture)
  }

  sprite.position.set(fish.col * TILE_SIZE, fish.row * TILE_SIZE)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.zIndex = 100
  sprite.interactive = true
  sprite.buttonMode = true
  sprite.parentId = fish.id

  let thisFish = store.getState().fishes.filter(f => f.id === fish.id)[0]
  let fishText = new Text(thisFish.population, {
    fontFamily: 'Arial',
    fontSize: 20,
    fill: 'white',
    align: 'center'
  })
  fishText.y += 5
  fishText.x += 5

  sprite
    .on('mouseover', () => {
      stage.removeChild(sprite)

      console.log('TCL: thisFish', thisFish)
      console.log('TCL: fish from store', fish.id)

      sprite.addChild(fishText)
      stage.addChild(sprite)
    })
    .on('mouseout', () => {
      sprite.removeChild(fishText)
    })

  stage.addChild(sprite)

  return sprite
}

export default makeFishSprite
