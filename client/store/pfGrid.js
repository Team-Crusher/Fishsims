const SET_PF_GRID = 'SET_PF_GRID'
const SET_START = 'SET_START'
const SET_END = 'SET_END'

export const setPFGrid = pfGrid => ({type: SET_PF_GRID, pfGrid})
export const setStart = start => ({type: SET_START, start})
export const setEnd = end => ({type: SET_END, end})

export default function(state = {}, action) {
  switch (action.type) {
    case SET_PF_GRID:
      return {...state, pfGrid: action.pfGrid}
    case SET_START:
      return {...state, start: action.start}
    case SET_END:
      return {...state, end: action.end}
    default:
      return state
  }
}
