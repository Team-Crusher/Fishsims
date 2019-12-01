import axios from 'axios'

const GOT_LEADERBOARDS = 'GOT_LEADERBOARDS'

export const gotLeaderboards = leaderboard => ({
  type: GOT_LEADERBOARDS,
  leaderboard
})

export const fetchLeaderboards = (key = 'ALL') => {
  return async dispatch => {
    const {data} = await axios.get('/api/leaderboards', {params: {board: key}})
    dispatch(gotLeaderboards(data))
  }
}

const init = null

export default function(state = init, action) {
  switch (action.type) {
    case GOT_LEADERBOARDS:
      return action.leaderboard
    default:
      return state
  }
}
