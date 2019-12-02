import {Sprite, Text} from 'pixi.js'
import {stage, resources, fishesImage} from './game'
import {TILE_SIZE} from '../script/drawMap'

const makeFishSprite = fish => {
  const sprite = new Sprite(resources[fishesImage].texture)
  sprite.position.set(fish.col * TILE_SIZE, fish.row * TILE_SIZE)
  sprite.interactive = true
  sprite.parentId = fish.id
  sprite.on('click', () => {
    console.log('Fish details: ', fish)
    // here is where you could create a Text of fish stats. Note the stats are on fish, not the Sprite
    // ...just make sure to clear the text when user clicks a different object or hits Esc key
  })
  stage.addChild(sprite)

  return sprite
}

export default makeFishSprite
