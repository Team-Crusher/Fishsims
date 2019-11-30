const SET_MAP = 'SET_MAP'

export const setMap = map => ({type: SET_MAP, map})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case SET_MAP:
      return action.map
    default:
      return state
  }
}
