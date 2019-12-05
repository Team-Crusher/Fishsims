/* eslint-disable no-case-declarations */
const SET_ACTIONSREEL = 'SET_ACTIONSREEL'
const ADD_ACTION_TO_REEL = 'ADD_ACTION_TO_REEL'
const RESET_ACTIONSREEL = 'RESET_ACTIONSREEL'

export const setActionsReel = reel => ({type: SET_ACTIONSREEL, reel})
export const addActionToReel = (
  objectId,
  socketId,
  playerName,
  reelActionType,
  reelActionDetail
) => ({
  type: ADD_ACTION_TO_REEL,
  objectId,
  socketId,
  playerName,
  reelActionType,
  reelActionDetail
})
export const resetActionsReel = () => ({type: RESET_ACTIONSREEL})

const init = {}

export default function(state = init, action) {
  switch (action.type) {
    case SET_ACTIONSREEL:
      return action.reel
    case ADD_ACTION_TO_REEL:
      const newAction = {
        objectId: action.objectId,
        socketId: action.socketId,
        playerName: action.playerName,
        reelActionType: action.reelActionType,
        reelActionDetail: action.reelActionDetail
      }
      return {
        ...state,
        [`${action.objectId}${action.reelActionType}`]: newAction
      }
    case RESET_ACTIONSREEL:
      return init
    default:
      return state
  }
}
