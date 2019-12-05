import React from 'react'
export class AudioPlayer extends React.Component {
  constructor() {
    super()
    this.playlist = [
      'https://sounds.tabletopaudio.com/132_Open_Ocean.mp3',
      'https://sounds.tabletopaudio.com/166_Quiet_Cove.mp3',
      'https://sounds.tabletopaudio.com/139_Sunken_Temple.mp3'
    ]
    this.state = {
      current: 0
    }

    this.handleSongEnd = this.handleSongEnd.bind(this)
  }
  handleSongEnd() {
    console.log('its over')
    this.setState(state => ({
      current: (state.current + 1) % this.playlist.length
    }))

    this.mount.play()
  }

  componentDidMount() {
    this.mount.play()
  }

  render() {
    return (
      <audio
        ref={ref => {
          this.mount = ref
        }}
        id="music"
        loop={true}
        onEnded={this.handleSongEnd}
        autoPlay={true}
      >
        <source src={this.playlist[this.state.current]} />
      </audio>
    )
  }
}

export default AudioPlayer
