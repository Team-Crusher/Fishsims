import {pfGrid, mapToMatrix} from '../../server/script/pathfinding.js'

const SET_PF_GRID = 'SET_PF_GRID'
const SET_START = 'SET_START'
const SET_END = 'SET_END'
const SET_RANGE = 'SET_RANGE'

export const setPFGrid = map => ({
  type: SET_PF_GRID,
  grid: pfGrid(mapToMatrix(map))
})
export const setStart = start => ({type: SET_START, start})
export const setEnd = end => ({type: SET_END, end})
export const setRange = range => ({type: SET_RANGE, range})

export default function(state = {}, action) {
  switch (action.type) {
    case SET_PF_GRID:
      return {...state, pfGrid: action.pfGrid}
    case SET_START:
      return {...state, start: action.start}
    case SET_END:
      return {...state, end: action.end}
    case SET_RANGE:
      return {...state, range: action.range}
    default:
      return state
  }
}
