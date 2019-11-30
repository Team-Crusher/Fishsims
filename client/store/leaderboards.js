import axios from 'axios'

const GOT_LEADERBOARDS = 'GOT_LEADERBOARDS'

export const gotLeaderboards = leaderboard => ({
  type: GOT_LEADERBOARDS,
  leaderboard
})

export const fetchLeaderboards = () => {
  return dispatch => {
    const {data} = axios.get('/api/leaderboards')
    dispatch(gotLeaderboards(data))
  }
}

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case GOT_LEADERBOARDS:
      return action.leaderboard
    default:
      return state
  }
}
