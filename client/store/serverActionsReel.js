/* eslint-disable no-case-declarations */
const SET_SERVERACTIONSREEL = 'SET_ACTIONSREEL'
const REMOVE_ACTION_FROM_REEL = 'REMOVE_ACTION_FROM_REEL'

export const setServerActionsReel = reel => ({
  type: SET_SERVERACTIONSREEL,
  reel
})

export const removeActionFromReel = actionKey => ({
  type: REMOVE_ACTION_FROM_REEL,
  actionKey
})

const init = {}

export default function(state = init, action) {
  switch (action.type) {
    case SET_SERVERACTIONSREEL:
      return action.reel
    case REMOVE_ACTION_FROM_REEL:
      const cp = {}
      for (let key in state) {
        if (key !== action.actionKey) {
          cp[key] = state[key]
        }
      }
      return cp
    default:
      return state
  }
}
