/* eslint-disable no-case-declarations */
const WITHDRAW_BOAT_NAME = 'WITHDRAW_BOAT_NAME'

const withdrawBoatName = boatName => ({type: WITHDRAW_BOAT_NAME, boatName})

const init = [
  'Flying Dutchman',
  'HMS Fishstack',
  'The Jolly Fisher',
  'Windbreaker',
  "Blackbeard's Revenge",
  "Bluebeard's Revenge",
  "Redbeard's Revenge",
  "Neckbeard's Revenge",
  'Coastal Clipper',
  'HMS Dubloon',
  'HMS Clapback',
  'The Jolly Schooner',
  'The Little Mermaid',
  "Scuttle's Delight",
  "Poseidon's Bounty",
  'Sea Stormer',
  'Fish Hunter',
  'Her Jolly Folly',
  'Sea Bird',
  'HMS Gimmefish',
  "Madame's Delight",
  "Charlie's Gambit",
  "Nick's Winning Fish",
  'The Sword of Frances',
  "Chris' Folly",
  'RIP Lil BUB',
  'The Black Pearl',
  "Queen Ursula's Revenge",
  'HMS Trident',
  'Tugboat Tom',
  'Wavebreaker',
  'Dawnbreaker',
  'Sea Treader',
  'Tuna Burglar',
  'The Salty Seahorse',
  'Mobile Bathtub',
  'The North Star',
  'The Gull',
  'Sharktooth',
  'Hammerhead',
  'HMS Tropics',
  'Shrimp Nabber',
  "Fynn's Gambit",
  'Dock Blocker'
]

const boatNames = (state = init, action) => {
  switch (action.type) {
    case WITHDRAW_BOAT_NAME:
      return state.filter(name => name !== action.boatName)
    default:
      return state
  }
}

module.exports = {boatNames, withdrawBoatName}
