import socket from '../socket'

export const drawCircle = (ctx, circle, color) => {
  ctx.beginPath()
  ctx.arc(circle.x, circle.y, 30, 0, Math.PI * 2, 0)
  ctx.fillStyle = color
  ctx.fill()
}

export const circleListener = addCircle => {
  document.addEventListener('click', e => {
    // addCircle(e.clientX, e.clientY)
    socket.emit('circle-add', {x: e.clientX, y: e.clientY})
  })
}
