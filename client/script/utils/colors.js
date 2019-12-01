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
