export function doOnce(cb) {
  function oof() {
    if (this.dontDoIt) {
      return
    }
    this.dontDoIt = true
    return cb(...arguments)
  }
  oof.dontDoIt = false
  return oof.bind({})
}
