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
  let color
  if (fish.fishType === 'shallows') {
    sprite = new Sprite(resources[fishesShallows].texture)
    fishType = `$ shallows`
    color = 'black'
  } else if (fish.fishType === 'openOcean') {
    sprite = new Sprite(resources[fishesOpenOcean].texture)
    fishType = `$$ openOcean`
    color = 'blue'
  } else if (fish.fishType === 'deep') {
    sprite = new Sprite(resources[fishesDeep].texture)
    fishType = `$$$ deep`
    color = 'gold'
  }

  sprite.position.set(fish.col * TILE_SIZE, fish.row * TILE_SIZE)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.zIndex = 100
  sprite.interactive = true
  sprite.buttonMode = true
  sprite.parentId = fish.id

  let thisFish = store.getState().fishes.filter(f => f.id === fish.id)[0]
  let populationText
  //--------------------- Create Fish Sprite -----------------------------

  let fishTypeText = new Text(fishType, {
    fontFamily: 'Arial',
    fontSize: 15,
    fill: color,
    align: 'center'
  })

  fishTypeText.y -= 5
  fishTypeText.x += 40

  //--------------------- End Creating Fish Sprite -----------------------------

  sprite
    .on('mouseover', () => {
      populationText = new Text(
        `Quantity: ${
          store.getState().fishes.filter(f => f.id === fish.id)[0].population
        }`,
        {
          fontFamily: 'Arial',
          fontSize: 15,
          fill: color,
          align: 'center'
        }
      )
      populationText.y -= 20
      populationText.x += 40
      // console.log(
      //   'TCL: thisFish',
      //   store.getState().fishes.filter(f => f.id === fish.id)[0]
      // )
      // console.log('TCL: fish from store', fish.id)

      sprite.addChild(populationText)
      sprite.addChild(fishTypeText)
    })
    .on('mouseout', () => {
      sprite.removeChild(populationText)
      sprite.removeChild(fishTypeText)
    })

  stage.addChild(sprite)

  return sprite
}

export default makeFishSprite
