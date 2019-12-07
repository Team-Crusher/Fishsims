import {Sprite, Text, SCALE_MODES, Graphics} from 'pixi.js'
import {stage, resources, fisheryImage} from './game'
import store from '../store'
import {TILE_SIZE} from '../script/drawMap'

const makeFisherySprite = fishery => {
  const {pName, col, row} = fishery
  const thisPlayer = store.getState().player

  const sprite = new Sprite(resources[fisheryImage].texture)
  sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  sprite.position.set(col * TILE_SIZE, row * TILE_SIZE)
  sprite.parentId = fishery.id
  stage.addChild(sprite)

  if (fishery.pId === thisPlayer.socketId) {
    const highlightCircle = new Graphics()
    highlightCircle.beginFill(0xff1100, 0.3) // Color it black
    highlightCircle.drawCircle(0, 0, 50)
    highlightCircle.endFill()
    highlightCircle.x += 15
    highlightCircle.y += 15
    sprite.addChild(highlightCircle)
  }

  const textStyle = {
    fontFamily: 'Arial',
    fontSize: 12,
    fill: 'black',
    align: 'center'
  }
  const FisheryName = new Text(pName, textStyle)
  FisheryName.resolution = 4
  FisheryName.x -= (FisheryName.width - TILE_SIZE) / 2
  FisheryName.y += 30
  FisheryName.zIndex = 101

  sprite.addChild(FisheryName)
  return sprite

  /**
   * Put utility functions below here inside makeFisherySprite func so that it has access to fishery and can dispatch to stores
   * @param {event} event\
   */
}

export default makeFisherySprite
