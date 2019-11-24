import socket from '../socket'

export const drawFish = (ctx, fish) => {
  ctx.beginPath()
  ctx.arc(fish.x * 64, fish.y * 64, fish.pop / 50, 0, Math.PI * 2, 0)
  ctx.fillStyle = 'pink'
  ctx.fill()
}

export const fishListener = () => {
  /* boats add fish to payload -->
  // get new fish population 
  socket.emit('update-fish', {
    cx: fish.cx, cy: fish.cy, r: pop/10,
  })
  */
}
