import {Sprite, Text} from 'pixi.js'
import {stage, resources, fishesImage} from './game'
import {TILE_SIZE} from '../script/drawMap'

const makeFishSprite = fish => {
  const sprite = new Sprite(resources[fishesImage].texture)
  sprite.position.set(fish.col * TILE_SIZE, fish.row * TILE_SIZE)
  sprite.quantity = 100
  sprite.anchor.set(0.5)
  sprite.scale.set(2)
  stage.addChild(sprite)
  /*  const nameText = new Text(sprite.quantity, {
    fontFamily: 'Arial',
    fontSize: 12, // TODO: remove once tiles correspond to population
    fill: 'white',
    align: 'center'
  })

  sprite.addChild(nameText)
  nameText.y += 24*/

  return sprite
}

export default makeFishSprite
