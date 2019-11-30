import {Sprite, Text} from 'pixi.js'
import {stage, resources, fisheryImage} from './game'
import store, {setSelectedObject} from '../store'
import {TILE_SIZE} from '../script/drawMap'

export const makeFisherySprite = fishery => {
  const {pName, x, y} = fishery
  const sprite = new Sprite(resources[fisheryImage].texture)
  sprite.position.set(x * TILE_SIZE, y * TILE_SIZE)
  sprite.interactive = true
  sprite.buttonMode = true
  sprite
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)

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
   *
   * @param {put utility functions below here inside makeFisherySprite func so that it has access to fishery and can dispatch to stores} event\
   */

  function onDragStart(event) {
    store.dispatch(setSelectedObject(fishery))
    console.log('event\t', event)
    console.log('position From: \t', event.data.global)
    this.data = event.data
    this.alpha = 0.5
    this.dragging = true
  }

  function onDragEnd(event) {
    console.log('position To: \t', event.data.global)

    this.alpha = 1
    this.dragging = false
    // set the interaction data to null
    this.data = null
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent)
      this.x = newPosition.x
      this.y = newPosition.y
    }
  }
}
