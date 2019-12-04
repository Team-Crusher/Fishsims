export function makeDarker(color, amount) {
  const allowed = '1234567890,'
  let out = ''
  for (let i = 0; i < color.length; i++) {
    if (allowed.indexOf(color[i]) !== -1) {
      out += color[i]
    }
  }
  return (
    'rgb(' +
    out
      .split(',')
      .map(n => Math.round(parseInt(n, 10) * (1 - amount)))
      .join(',') +
    ')'
  )
}

export function makeAlpha(color, amount) {
  return color.replace(')', `,${amount})`)
}

function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

export function rgbToHex(color) {
  const firstSplit = color.split(',')
  const r = firstSplit[0].split('(')[1]
  console.log(r)
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}
