export const getBoatFishTotal = boat => {
  let boatCurrentFishes = 0
  for (let key in boat.fishes) boatCurrentFishes += boat.fishes[key]
  return boatCurrentFishes
}
