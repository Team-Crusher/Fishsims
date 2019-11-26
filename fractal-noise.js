const rand = () => Math.random() - 0.5

let heights = []
const k = 6
const N = Math.pow(2, k) + 1
for (let i = 0; i < N; i++) {
  const a = []
  for (let j = 0; j < N; j++) a.push(0)
  heights.push(a)
}

const makeMap = () => {
  let step = N - 1
  let noise = step / 2
  // initialize corners first
  heights[0][0] = noise * rand()
  heights[step][0] = noise * rand()
  heights[0][step] = noise * rand()
  heights[step][step] = noise * rand()
  // magic
  while (step > 1) {
    for (let i = step / 2; i < N; i += step) {
      for (let j = step / 2; j < N; j += step) {
        let sum = 0
        let count = 0
        if (j - step / 2 >= 0 && i - step / 2 >= 0) {
          sum += heights[j - step / 2][i - step / 2]
          count++
        }
        if (j - step / 2 >= 0 && i + step / 2 < N) {
          sum += heights[j - step / 2][i + step / 2]
          count++
        }
        if (j + step / 2 < N && i + step / 2 < N) {
          sum += heights[j + step / 2][i + step / 2]
          count++
        }
        if (j + step / 2 < N && i - step / 2 >= 0) {
          sum += heights[j + step / 2][i - step / 2]
          count++
        }
        // add to the array the average of parents + random * noise
        heights[j][i] = (sum / count || 0) + noise / 2 * rand()
      }
    }
    // up down
    for (let i = 0; i < N; i += step) {
      for (let j = step / 2; j < N; j += step) {
        let sum = 0
        let count = 0
        if (j - step / 2 >= 0) {
          sum += heights[j - step / 2][i]
          count++
        }
        if (j + step / 2 < N) {
          sum += heights[j + step / 2][i]
          count++
        }
        if (i - step / 2 >= 0) {
          sum += heights[j][i - step / 2]
          count++
        }
        if (i + step / 2 < N) {
          sum += heights[j][i + step / 2]
          count++
        }
        heights[j][i] = (sum / count || 0) + noise / 2 * rand()
      }
    }
    // left right
    for (let i = step / 2; i < N; i += step) {
      for (let j = 0; j < N; j += step) {
        let sum = 0
        let count = 0
        if (j - step / 2 >= 0) {
          sum += heights[j - step / 2][i]
          count++
        }
        if (j + step / 2 < N) {
          sum += heights[j + step / 2][i]
          count++
        }
        if (i - step / 2 >= 0) {
          sum += heights[j][i - step / 2]
          count++
        }
        if (i + step / 2 < N) {
          sum += heights[j][i + step / 2]
          count++
        }
        heights[j][i] = (sum / count || 0) + noise / 2 * rand()
      }
    }
    step /= 2
    noise = step / 2
  }

  const M = Math.max(...heights.map(row => Math.max(...row)))
  const m = Math.min(...heights.map(row => Math.min(...row)))

  // normalizing
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++)
      heights[i][j] = Math.floor((heights[i][j] - m) / (M - m) * (N - 1))

  /*  // pgm output
  console.log('P2')
  console.log(`${N} ${N}`)
  console.log(N)
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let x = i;
      let y = j;

      x = heights[x][y];
      y = heights[(x * 57 + 130) % N][(y + 25) % N]

      x = heights[x][y];
      y = heights[(x + 13) % N][(y * 7 + 259) % N]

      console.log(heights[x][y]) //> N / 2 ? N : 0);
    }
  }*/
  return heights
}

module.exports = {makeMap}
