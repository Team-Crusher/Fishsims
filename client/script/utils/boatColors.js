/**
 *
 * @param {String} color the rgb string color of the player
 */

import {spritePath} from '../game'
import {makeDarker} from './'
import store from '../../store'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
ctx.canvas.width = 32
ctx.canvas.height = 32

const img = new Image()
img.src = `assets/noSailBoat.png`
// img.id = 'sailless-boat'
// document.body.appendChild(img)

function p(x, y, w, h, a) {
  return {x, y, w, h, a}
}

const sail = [
  p(14, 4, 3, 1, 0),
  p(13, 5, 5, 1, 0),
  p(12, 6, 7, 1, 0),
  p(11, 7, 9, 1, 0),
  p(10, 8, 11, 1, 0),
  p(9, 9, 13, 1, 0),
  p(8, 10, 15, 1, 0),
  p(7, 11, 17, 1, 0),
  p(6, 12, 19, 1, 0),
  p(5, 13, 21, 1, 0),

  p(12, 11, 1, 1, 0.2),
  p(18, 11, 1, 1, 0.2),
  p(10, 12, 4, 1, 0.2),
  p(17, 12, 3, 1, 0.2),

  p(6, 13, 19, 1, 0.4)
]

export function getColoredBoat(color) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < sail.length; i++) {
    const {x, y, w, h, a} = sail[i]
    ctx.fillStyle = makeDarker(color, a)
    ctx.fillRect(x, y, w, h)
  }

  ctx.clearRect(14, 7, 3, 4)
  ctx.clearRect(15, 4, 1, 1)

  ctx.drawImage(img, 0, 0)
  return canvas.toDataURL()
}

export function addBoatsToLoader(loader) {
  const players = store.getState().lobby.players
  players.forEach(e => {
    loader.add(`${e.socketId}BOAT`, getColoredBoat(e.color))
  })
}
