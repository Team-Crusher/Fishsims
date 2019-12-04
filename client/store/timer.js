const SET_TIMER = 'SET_TIMER'

export const setTimer = time => ({type: SET_TIMER, time})

const init = 0

export default function(state = init, action) {
  switch (action.type) {
    case SET_TIMER:
      return action.time
    default:
      return state
  }
}
