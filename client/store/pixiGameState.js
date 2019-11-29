const SET_PIXIGAMESTATE = 'SET_PIXIGAMESTATE'

export const setPixiGameState = state => ({type: SET_PIXIGAMESTATE, state})

const init = 'playerTurn'

export default function(state = init, action) {
  switch (action.type) {
    case SET_PIXIGAMESTATE:
      return action.state
    default:
      return state
  }
}
