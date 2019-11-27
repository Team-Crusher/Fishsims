import socket from '../socket'
import store from '../store'

// Assuming socket has emitted fish data [{x1, y1}, {x2, y2}, ... , {xn, yn}]

const getFish = () => {
  // add player/socket id param to ensure valid request
  const {fishes} = store.getState() || []
  return fishes
}

// game loop decides if new or old sprites
// instantiate new Sprite if added to fishes array on store & add to the stage
// make new fish -> add to array, add to stage
// remove fish -> rm from array, rm from stage
