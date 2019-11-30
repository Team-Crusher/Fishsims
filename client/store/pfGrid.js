const SET_PF_GRID = 'SET_PF_GRID'
export const setPFGrid = pfGrid => ({type: SET_PF_GRID, pfGrid})

export default function(state = [], action) {
  switch (action.type) {
    case SET_PF_GRID:
      return action.pfGrid
    default:
      return state
  }
}
