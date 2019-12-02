const SET_PF_GRID = 'SET_PF_GRID'
const SET_START = 'SET_START'
const SET_END = 'SET_END'

export const setPFGrid = pfGrid => ({type: SET_PF_GRID, pfGrid})
export const setStart = start => ({type: SET_START, start})
export const setEnd = end => ({type: SET_START, end})

export default function(state = [], action) {
  switch (action.type) {
    case SET_PF_GRID:
      return action.pfGrid
    case SET_START:
      return action.start
    case SET_END:
      return action.end
    default:
      return state
  }
}
