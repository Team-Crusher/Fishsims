const {mapToMatrix, pfGrid} = require('../../server/script/pathfinding')

const SET_PF_GRID = 'SET_PF_GRID'
const setPFGrid = map => ({type: SET_PF_GRID, pfGrid: pfGrid(mapToMatrix(map))})

const pFGrid = (state = [], action) => {
  switch (action.type) {
    case SET_PF_GRID:
      return action.pfGrid
    default:
      return state
  }
}

module.exports = {pFGrid, setPFGrid}
