/* eslint-disable no-case-declarations */
const ADD_ACTION_TO_REEL = 'ADD_ACTION_TO_REEL'
const RESET_REEL = 'RESET_REEL'

const addActionToReel = reelAction => ({type: ADD_ACTION_TO_REEL, reelAction})

const resetReel = () => ({type: RESET_REEL})

const init = []

const serverActionsReel = (state = init, action) => {
  switch (action.type) {
    case ADD_ACTION_TO_REEL:
      return [...state, action.reelAction]
    case RESET_REEL:
      return init
    default:
      return state
  }
}

module.exports = {serverActionsReel, addActionToReel, resetReel}
