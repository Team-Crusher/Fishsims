import {Sprite, Text, SCALE_MODES} from 'pixi.js'
import {stage, resources, fisheryImage} from './game'
import store, {setSelectedObject} from '../store'
import {TILE_SIZE} from '../script/drawMap'

const makeFisherySprite = fishery => {
  const {pName, col, row} = fishery
  const sprite = new Sprite(resources[fisheryImage].texture)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.position.set(col * TILE_SIZE, row * TILE_SIZE)
  sprite.parentId = fishery.id
  stage.addChild(sprite)

  const nameText = new Text(pName, {
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 'white',
    align: 'center'
  })

  sprite.addChild(nameText)
  nameText.y += 24

  return sprite

  /**
   * Put utility functions below here inside makeFisherySprite func so that it has access to fishery and can dispatch to stores
   * @param {event} event\
   */
}

export default makeFisherySprite
