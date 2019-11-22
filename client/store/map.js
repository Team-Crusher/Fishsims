import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_MAP = 'GOT_MAP'

/**
 * INITIAL STATE
 */
const init = {
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 2, 3, 2]
  ],
  scroll: {
    sx: 0,
    sy: 0
  }
}

export default function(state = init, action) {
  switch (action.type) {
    case GOT_MAP:
      return action.map
    default:
      return state
  }
}
