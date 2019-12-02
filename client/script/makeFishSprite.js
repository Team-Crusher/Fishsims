import {Sprite, Text} from 'pixi.js'
import {stage, resources, fishesImage} from './game'
import {TILE_SIZE} from '../script/drawMap'

const makeFishSprite = fish => {
  const sprite = new Sprite(resources[fishesImage].texture)
  sprite.position.set(fish.x * TILE_SIZE, fish.y * TILE_SIZE)
  sprite.quantity = fish.pop // TODO: divide by... 10? 50? 100?
  stage.addChild(sprite)
  const nameText = new Text(fish.pop, {
    fontFamily: 'Arial',
    fontSize: 12, // TODO: remove once tiles correspond to population
    fill: 'white',
    align: 'center'
  })

  sprite.addChild(nameText)
  nameText.y += 24

  return sprite
}

export default makeFishSprite
