/**
 * ACTION TYPES
 */
const SET_SCROLL_POS = 'SET_SCROLL_POS'
const SET_ZOOM = 'SET_ZOOM'

export const setScrollPos = pos => ({type: SET_SCROLL_POS, pos})
export const setZoom = zoom => ({type: SET_ZOOM, zoom})

/**
 * INITIAL STATE
 */
const init = {
  zoom: 1,
  pos: {x: 0, y: 0}
}

export default function(state = init, action) {
  switch (action.type) {
    case SET_SCROLL_POS:
      return {...state, pos: action.pos}
    case SET_ZOOM:
      return {...state, zoom: action.zoom}
    default:
      return state
  }
}
