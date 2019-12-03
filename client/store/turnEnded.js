const SET_TURN_ENDED = 'SET_TURNENDED'

export const setTurnEnded = bool => ({type: SET_TURN_ENDED, bool})

const init = false

export default function(state = init, action) {
  switch (action.type) {
    case SET_TURN_ENDED:
      return action.bool
    default:
      return state
  }
}
