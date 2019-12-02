import {Sprite, Text} from 'pixi.js'
import {stage, resources, fishesImage} from './game'
import {TILE_SIZE} from '../script/drawMap'

const makeFishSprite = fish => {
  const sprite = new Sprite(resources[fishesImage].texture)
  sprite.position.set(fish.col * TILE_SIZE, fish.row * TILE_SIZE)
  sprite.interactive = true
  sprite.buttonMode = true
  sprite.parentId = fish.id

  const nameText = new Text(fish.population, {
    fontFamily: 'Arial',
    fontSize: 20,
    fill: 'white',
    align: 'center'
  })
  nameText.y += 5
  nameText.x += 5

  sprite
    .on('mouseover', () => {
      stage.removeChild(sprite)
      // here is where you could create a Text of fish stats. Note the stats are on fish, not the Sprite
      // ...just make sure to clear the text when user clicks a different object or hits Esc key

      sprite.addChild(nameText)
      stage.addChild(sprite)
    })
    .on('mouseout', () => {
      sprite.removeChild(nameText)
    })

  stage.addChild(sprite)

  return sprite
}

export default makeFishSprite
