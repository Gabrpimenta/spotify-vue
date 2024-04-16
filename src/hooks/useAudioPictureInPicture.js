import { ref } from 'vue'

/**
 * React hook that allow you to enable picture in picture mode on a music player
 * @param {*} initialImage
 * @param {function} onPlay
 * @param {function} onPause
 * @param {function} onPrevious
 * @param {function} onNext
 */
export const useAudioPictureInPicture = (
  initialImage,
  isPlaying,
  onPlay,
  onPause,
  onPrevious,
  onNext
) => {
  const isPipToggled = ref(false)
  const setIsToggled = (value) => {
    isPipToggled.value = value
  }
  let thumb = initialImage
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 512
  const video = document.createElement('video')

  video.muted = true

  const togglePip = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture().then(() => {
        setIsToggled(false)
      })
    } else {
      video.srcObject = canvas.captureStream()

      await updatePip(thumb)
      await video.requestPictureInPicture().then(() => {
        setIsToggled(true)
        if (isPlaying) {
          document.pictureInPictureElement.play()
        } else {
          document.pictureInPictureElement.pause()
        }
      })
    }
  }
  /**
   * update the picture in picture background
   * @param {*} image path of the new image
   */
  const updatePip = async (image) => {
    if (document.pictureInPictureElement) document.exitPictureInPicture()
    thumb = image
    const thumbnail = new Image()
    thumbnail.crossOrigin = true
    thumbnail.src = thumb
    await thumbnail.decode()
    const aspectRatio = thumbnail.width / thumbnail.height

    canvas.getContext('2d').drawImage(thumbnail, -200, 0, 512 * aspectRatio, 512)
    await video.play()
    await video.requestPictureInPicture()
  }

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    if (onPrevious) onPrevious()
  })

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    if (onNext) onNext()
  })

  navigator.mediaSession.setActionHandler('pause', () => {
    console.log('pause')
    if (onPause) onPause()

    if (document.pictureInPictureElement) document.pictureInPictureElement.pause()
  })

  navigator.mediaSession.setActionHandler('play', () => {
    console.log('play')
    if (onPlay) onPlay()

    if (document.pictureInPictureElement) document.pictureInPictureElement.play()
  })

  return {
    isPipToggled,
    togglePip,
    updatePip
  }
}
