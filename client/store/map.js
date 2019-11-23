import axios from 'axios'
import history from '../history'

const makeFake = size => {
  const out = Array(size)
    .fill(0)
    .map(() => {
      return Array(size)
        .fill(0)
        .map(() => Math.round(Math.random() - 0.4 * 1) + 1)
    })
  return out
}

const oldFake = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 2, 3, 2]
]

/**
 * ACTION TYPES
 */
const GOT_MAP = 'GOT_MAP'

export const setMap = map => ({type: GOT_MAP, map})

/**
 * INITIAL STATE
 */
/*const init = {
   map: makeFake(1000),
   scroll: {
   sx: 0,
   sy: 0
   }
   }*/

const init = {}

export default function(state = init, action) {
  switch (action.type) {
    case GOT_MAP:
      return action.map
    default:
      return state
  }
}
