const SET_ACTIONSREEL = 'SET_ACTIONSREEL'

export const setActionsReel = reel => ({type: SET_ACTIONSREEL, reel})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case SET_ACTIONSREEL:
      return action.reel
    default:
      return state
  }
}
