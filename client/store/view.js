/**
 * ACTION TYPES
 */
const SET_SCROLL_POS = 'SET_SCROLL_POS'
const INCREASE_SCROLL_POSITION = 'INCREASE_SCROLL_POSITION'
const SET_ZOOM = 'SET_ZOOM'

export const setScrollPos = pos => ({type: SET_SCROLL_POS, pos})
export const increaseScroll = (x, y) => ({type: INCREASE_SCROLL_POSITION, x, y})
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
    case INCREASE_SCROLL_POSITION:
      return {...state, pos: {x: state.pos + action.x, y: state.pos + action.y}}
    case SET_ZOOM:
      return {...state, zoom: action.zoom}
    default:
      return state
  }
}
