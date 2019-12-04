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
  let fishType
  if (fish.fishType === 'shallows') {
    sprite = new Sprite(resources[fishesShallows].texture)
    fishType = `$ shallows`
  } else if (fish.fishType === 'openOcean') {
    sprite = new Sprite(resources[fishesOpenOcean].texture)
    fishType = `$$ openOcean`
  } else if (fish.fishType === 'deep') {
    sprite = new Sprite(resources[fishesDeep].texture)
    fishType = `$$$ deep`
  }

  sprite.position.set(fish.col * TILE_SIZE, fish.row * TILE_SIZE)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.zIndex = 100
  sprite.interactive = true
  sprite.buttonMode = true
  sprite.parentId = fish.id

  let thisFish = store.getState().fishes.filter(f => f.id === fish.id)[0]

  //--------------------- Create Fish Sprite -----------------------------
  let populationText = new Text(`Pop: ${thisFish.population}`, {
    fontFamily: 'Arial',
    fontSize: 10,
    fill: 'white',
    align: 'center'
  })

  let fishTypeText = new Text(fishType, {
    fontFamily: 'Arial',
    fontSize: 10,
    fill: 'white',
    align: 'center'
  })

  populationText.y -= 15
  populationText.x += 40

  fishTypeText.y -= 5
  fishTypeText.x += 40

  //--------------------- End Creating Fish Sprite -----------------------------

  sprite
    .on('mouseover', () => {
      stage.removeChild(sprite)

      console.log('TCL: thisFish', thisFish)
      console.log('TCL: fish from store', fish.id)

      sprite.addChild(populationText)
      sprite.addChild(fishTypeText)
      stage.addChild(sprite)
    })
    .on('mouseout', () => {
      sprite.removeChild(populationText)
      sprite.removeChild(fishTypeText)
    })

  stage.addChild(sprite)

  return sprite
}

export default makeFishSprite
