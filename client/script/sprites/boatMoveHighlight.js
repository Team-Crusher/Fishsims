import {Graphics} from 'pixi.js'
import {stage} from '../game'

import {commitToReel, getRange} from '../utils'
const {TILE_SIZE} = require('../../../server/CONSTANTS')
import store, {removeSelectedObject, setEnd} from '../../store'

export let rangeTiles = []
export let selectedSprite = {isSelected: false}

export function clearRange() {
  while (rangeTiles.length) {
    rangeTiles.pop().destroy()
  }
}

export function makeBoatHighlight(x, y, maxDistance, sprite) {
  const range = getRange({x, y, maxDistance})
  console.log(selectedSprite)
  selectedSprite.isSelected = false
  sprite.isSelected = true
  selectedSprite = sprite
  clearRange() // only select one boat at once
  range.forEach(tile => {
    const traversable = new Graphics()
    traversable.beginFill(0x800080, 0.3) // Color it black
    traversable.drawRect(0, 0, 32, 32)
    traversable.endFill()
    traversable.position.set(tile.col * TILE_SIZE, tile.row * TILE_SIZE)
    traversable.row = tile.row
    traversable.col = tile.col
    traversable.alpha = 0.5
    traversable.interactive = true
    traversable.zIndex = 101
    rangeTiles.push(traversable)
    stage.addChild(traversable)

    traversable.on('click', () => {
      selectedSprite.isSelected = false
      store.dispatch(setEnd({row: traversable.row, col: traversable.col}))
      commitToReel()
      clearRange()
      store.dispatch(removeSelectedObject({sprite}))
      // sprite.isSelected = !sprite.isSelected
    })
  })
}
