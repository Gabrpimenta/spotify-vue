import { defineStore } from 'pinia'
import artist from '@/artist.json'
export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentArtist: null,
    currentTrack: null,
    volume: 0.4,
    likedSongs: [
      {
        id: 2,
        name: 'Lost and Found',
        path: '/songs/LostAndFound.mp3'
      }
    ]
  }),

  actions: {
    loadSong(artist, track) {
      this.currentArtist = artist
      this.currentTrack = track

      if (this.audio && this.audio.src) {
        this.audio.pause()
        this.isPlaying = false
        this.audio.src = ''
      }

      this.audio = new Audio()
      this.audio.src = track.path
      this.audio.volume = this.volume
      setTimeout(() => {
        this.isPlaying = true
        this.audio.play()
      }, 200)
    },
    loadDefaultSong() {
      const track = artist.tracks[1]
      // this.loadSong(artist, track)

      this.currentArtist = artist
      this.currentTrack = track

      this.audio = new Audio()
      this.audio.src = track.path
      this.audio.id = 'MusicPlayerAudioID'
    },
    loadLastStorageSong() {
      this.audio = new Audio()
      this.audio.src = this.currentTrack.path
      this.audio.id = 'MusicPlayerAudioID'
    },
    playOrPauseSong() {
      if (this.audio.paused) {
        this.isPlaying = true
        this.audio.play()
      } else {
        this.isPlaying = false
        this.audio.pause()
      }
    },

    playOrPauseThisSong(artist, track) {
      if (!this.audio || !this.audio.src || this.currentTrack.id !== track.id) {
        this.loadSong(artist, track)
        return
      }
      this.playOrPauseSong()
    },

    prevSong(currentTrack) {
      let track
      if (currentTrack.id === artist.tracks[0].id) {
        track = artist.tracks[artist.tracks.length - 1]
      } else {
        track = artist.tracks[currentTrack.id - 2]
      }
      this.loadSong(artist, track)
    },

    nextSong(currentTrack) {
      if (currentTrack.id === artist.tracks.length) {
        let track = artist.tracks[0]
        this.loadSong(artist, track)
      } else {
        let track = artist.tracks[currentTrack.id]
        this.loadSong(artist, track)
      }
    },
    playFromFirst() {
      this.resetState()
      let track = artist.tracks[0]
      this.loadSong(artist, track)
    },

    resetState() {
      this.isPlaying = false
      this.audio = null
      this.currentArtist = null
      this.currentTrack = null
    },
    addLikedSong(track) {
      this.likedSongs.push(track)
    },
    removeLikedSong(track) {
      this.likedSongs = this.likedSongs.filter((el) => el.id != track.id)
    }
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.currentTrack === null) {
        ctx.store.loadDefaultSong()
      } else {
        ctx.store.loadLastStorageSong()
      }
    },
    debug: true
  }
})
