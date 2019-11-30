import {Sprite, Text} from 'pixi.js'
import {stage, resources, fishesImage} from './game'
import {TILE_SIZE} from '../script/drawMap'

export const makeFishSprite = fish => {
  const sprite = new Sprite(resources[fishesImage].texture)
  sprite.position.set(fish.x * TILE_SIZE, fish.y * TILE_SIZE)
  sprite.quantity = fish.pop
  stage.addChild(sprite)
  const nameText = new Text(fish.pop, {
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 'white',
    align: 'center'
  })

  sprite.addChild(nameText)
  nameText.y += 24

  return sprite
}
