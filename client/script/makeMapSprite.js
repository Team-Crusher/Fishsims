import {Sprite, SCALE_MODES} from 'pixi.js'
import {resources} from './game'
import store, {setEnd} from '../store'
import {TILE_SIZE} from './drawMap.js'

const makeMapSprite = () => {
  const map = new Sprite(resources.map.texture)
  map.zIndex = -9001
  map.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
  map.scale.set(32, 32)
  map.interactive = true
  map.on('click', handleClick)
  return map
}

const handleClick = e => {
  if (store.getState().pf.start.row) {
    //    console.log('col: ', e.data.global.x / TILE_SIZE, 'row: ', e.data.global.y / TILE_SIZE)
    console.log(e.data)
  } else console.log('bye')
}

export default makeMapSprite
