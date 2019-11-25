/**
 * ACTION TYPES
 */
const SET_BOATS = 'SET_BOATS'

export const setBoats = boats => ({type: SET_BOATS, boats})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case SET_BOATS:
      return action.boats
    default:
      return state
  }
}
