/* eslint-disable no-case-declarations */
const SET_SERVERACTIONSREEL = 'SET_ACTIONSREEL'

export const setServerActionsReel = reel => ({
  type: SET_SERVERACTIONSREEL,
  reel
})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case SET_SERVERACTIONSREEL:
      return action.reel
    default:
      return state
  }
}
