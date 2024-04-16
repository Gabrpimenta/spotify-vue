<script setup>
import { ref, watch, onMounted } from 'vue'
import MusicPlayerVolume from '@/components/MusicPlayerVolume.vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import PictureInPictureBottomRight from 'vue-material-design-icons/PictureInPictureBottomRight.vue'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import SkipBackward from 'vue-material-design-icons/SkipBackward.vue'
import SkipForward from 'vue-material-design-icons/SkipForward.vue'

import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'

const useSong = useSongStore()
const { isPlaying, audio, currentTrack, currentArtist } = storeToRefs(useSong)
let isHoverMainPlayPauseButton = ref(false)
let isHover = ref(false)
let isTrackTimeCurrent = ref('0:00')
let isTrackTimeTotal = ref(null)
let seeker = ref(null)
let seekerContainer = ref(null)
let range = ref(0)

let isPlayingBefore = ref(false)

onMounted(() => {
  if (audio.value) {
    timeupdate()
    loadedmetadata()
  }

  if (currentTrack.value) {
    seeker.value.addEventListener('change', function () {
      console.log('seeker change')
      const time = audio.value.duration * (seeker.value.value / 100)
      audio.value.currentTime = time
    })

    seeker.value.addEventListener('mousedown', function (e) {
      audio.value.pause()

      const clickPosition =
        (e.pageX - seekerContainer.value.offsetLeft) / seekerContainer.value.offsetWidth
      const time = audio.value.duration * clickPosition
      audio.value.currentTime = time
      seeker.value.value = (100 / audio.value.duration) * audio.value.currentTime

      if (isPlaying.value) {
        isPlayingBefore.value = true
      } else {
        isPlayingBefore.value = false
      }
    })

    seeker.value.addEventListener('mouseup', function () {
      console.log('mouseup')
      if (isPlayingBefore.value) {
        audio.value.play()
        isPlaying.value = true
      }
    })

    seekerContainer.value.addEventListener('click', function (e) {
      console.log('click')
      const clickPosition =
        (e.pageX - seekerContainer.value.offsetLeft) / seekerContainer.value.offsetWidth
      const time = audio.value.duration * clickPosition
      audio.value.currentTime = time
      seeker.value.value = (100 / audio.value.duration) * audio.value.currentTime
    })
  }
})

const timeupdate = () => {
  if (audio.value.currentSrc !== undefined) {
    audio.value.addEventListener('timeupdate', function () {
      const minutes = Math.floor(audio.value.currentTime / 60)
      const seconds = Math.floor(audio.value.currentTime - minutes * 60)
      isTrackTimeCurrent.value = minutes + ':' + seconds.toString().padStart(2, '0')
      const value = (100 / audio.value.duration) * audio.value.currentTime
      range.value = value
      seeker.value.value = value
    })
  }
}
const loadedmetadata = () => {
  if (audio.value.currentSrc !== undefined) {
    audio.value.addEventListener('loadedmetadata', function () {
      const duration = audio.value.duration
      const minutes = Math.floor(duration / 60)
      const seconds = Math.floor(duration % 60)
      isTrackTimeTotal.value = minutes + ':' + seconds.toString().padStart(2, '0')
    })
  }
}

watch(
  () => audio.value,
  () => {
    timeupdate()
    loadedmetadata()
  }
)

watch(
  () => isTrackTimeCurrent.value,
  (time) => {
    if (time && time == isTrackTimeTotal.value) {
      useSong.nextSong(currentTrack.value)
    }
  }
)
import { useAudioPictureInPicture } from '@/hooks/useAudioPictureInPicture'
const PlayPausePip = () => {
  console.log('testfunc')
  useSong.playOrPauseSong()
}
const NextPip = () => {
  console.log('testfunc')
  useSong.nextSong(currentTrack.value)
}
const PrevPip = () => {
  console.log('testfunc')
  useSong.prevSong(currentTrack.value)
}
const { isPipToggled, togglePip } = useAudioPictureInPicture(
  currentArtist.value.albumCover,
  isPlaying.value,
  PlayPausePip,
  PlayPausePip,
  PrevPip,
  NextPip
)

const togglePiPMode = () => {
  togglePip()
}

const handlePlay = () => {
  console.log('Кнопка воспроизведения была нажата')
}

const handlePause = () => {
  console.log('Кнопка паузы была нажата')
}

const handleNextSong = () => {
  console.log('Кнопка для следующей песни была нажата')
}

const handlePrevSong = () => {
  console.log('Кнопка для предыдущей песни была нажата')
}

watch(
  () => isPlaying.value,
  () => {
    if (document.pictureInPictureElement) {
      if (isPlaying.value) {
        document.pictureInPictureElement.play()
      } else {
        document.pictureInPictureElement.pause()
      }
    }
  }
)
watch(
  () => isPipToggled.value,
  () => {
    console.log(!isPipToggled.value)
    if (document.pictureInPictureElement) {
      if (isPlaying.value) {
        document.pictureInPictureElement.play()
      } else {
        document.pictureInPictureElement.pause()
      }
    }
    if (!isPipToggled.value) {
      // Если режим PiP не включен, добавляем слушатели событий
      audio.value.addEventListener('play', handlePlay)
      audio.value.addEventListener('pause', handlePause)
      audio.value.addEventListener('nextsong', handleNextSong)
      audio.value.addEventListener('previoussong', handlePrevSong)
    } else {
      // Если режим PiP включен, удаляем все слушатели событий
      audio.value.removeEventListener('play', handlePlay)
      audio.value.removeEventListener('pause', handlePause)
      audio.value.removeEventListener('nextsong', handleNextSong)
      audio.value.removeEventListener('previoussong', handlePrevSong)
    }
  }
)
</script>

<template lang="">
  <div
    id="MusicPlayer"
    v-if="audio"
    class="flex items-center justify-between bottom-0 w-full z-50 h-[100px] sm:h-[90px] bg-[#181818] border-t border-t-[#272727]"
  >
    <div class="max-w-[35%] flex items-center w-2/6 sm:w-1/4">
      <div class="flex itemc-left sm:items-center flex-col sm:flex-row ml-2 sm:ml-4">
        <div class="flex">
          <div
            class="max-w-[35px] min-w-[35px] h-[35px] sm:max-w-[55px] sm:min-w-[55px] sm:h-[55px] rounded-sm shadow-2xl overflow-hidden"
          >
            <img class="w-full h-full object-cover" :src="currentArtist.albumCover" />
          </div>
          <div class="flex sm:hidden items-center ml-2 sm:ml-8">
            <Heart fillColor="#1BD760" :size="20" />
          </div>
        </div>
        <div class="sm:ml-4">
          <div
            class="text-[12px] max-w-[90%] sm:max-w-[100%] sm:text-[14px] text-nowrap overflow-hidden text-white hover:underline cursor-pointer"
          >
            {{ currentTrack.name }}
          </div>
          <div
            class="text-[10px] sm:text-[11px] text-nowrap overflow-hidden text-zinc-400 hover:underline hover:text-white cursor-pointer"
          >
            {{ currentArtist.name }}
          </div>
        </div>
      </div>
      <div class="hidden sm:flex items-center ml-2 sm:ml-8">
        <Heart fillColor="#1BD760" :size="20" />
      </div>
    </div>
    <div class="sm:max-w-[45%] mx-auto w-3/6 sm:w-2/4">
      <div class="flex-col items-center justify-center">
        <div class="buttons flex items-center justify-center h-[30px]">
          <div class="flex justify-between w-[150px]">
            <button class="mx-2">
              <SkipBackward
                class="text-zinc-300 hover:text-white"
                :size="25"
                @click="useSong.prevSong(currentTrack)"
              />
            </button>
            <button
              class="p-1 rounded-full mx-3 bg-white"
              @click="useSong.playOrPauseSong(currentArtist, currentTrack)"
            >
              <Play
                v-if="!isPlaying"
                fillColor="#181818"
                @mouseover="isHoverMainPlayPauseButton = true"
                @mouseout="isHoverMainPlayPauseButton = false"
                :size="isHoverMainPlayPauseButton ? 27 : 25"
              />
              <Pause
                v-else
                fillColor="#181818"
                @mouseover="isHoverMainPlayPauseButton = true"
                @mouseout="isHoverMainPlayPauseButton = false"
                :size="isHoverMainPlayPauseButton ? 27 : 25"
              />
            </button>
            <button class="mx-2">
              <SkipForward
                class="text-zinc-300 hover:text-white"
                :size="25"
                @click="useSong.nextSong(currentTrack)"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="flex items-center h-[25px]">
        <div v-if="isTrackTimeCurrent" class="text-white text-[12px] pr-2 pt-[11px]">
          {{ isTrackTimeCurrent }}
        </div>
        <div
          ref="seekerContainer"
          class="w-full rounded-full cursor-pointer relative mt-2 mb-3"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
        >
          <input
            v-model="range"
            ref="seeker"
            type="range"
            class="cursor-pointer absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
            :class="{ rangeDotHidden: !isHover }"
          />
          <div
            class="pointer-events-none cursor-pointer rounded-full mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
            :style="`width: ${range}%;`"
            :class="isHover ? 'bg-green-500' : 'bg-white'"
          />
          <div
            class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
          />
        </div>
        <div v-if="isTrackTimeTotal" class="text-white text-[12px] pl-2 pt-[11px]">
          {{ isTrackTimeTotal }}
        </div>
      </div>
    </div>
    <div
      class="max-w-[26%] sm:max-w-[35%] flex items-center w-2/6 sm:w-1/4 justify-end pr-3 sm:pr-10"
    >
      <MusicPlayerVolume />
      <div class="hidden sm:block cursor-pointer ml-4" @click="togglePiPMode">
        <PictureInPictureBottomRight
          :class="isPipToggled ? 'text-green-500' : 'text-zinc-300 hover:text-white'"
          :size="18"
        />
      </div>
    </div>
  </div>
</template>

<style>
.rangeDotHidden[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}
</style>
