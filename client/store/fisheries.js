const SET_FISHERIES = 'SET_FISHERIES'

export const setFisheries = fisheries => ({type: SET_FISHERIES, fisheries})

export default function(state = [], action) {
  switch (action.type) {
    case SET_FISHERIES:
      return action.fisheries
    default:
      return state
  }
}
