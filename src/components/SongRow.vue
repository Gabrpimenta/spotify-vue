<script setup>
import { ref, toRefs, onMounted, toRaw } from 'vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'

import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'

const useSong = useSongStore()
const { isPlaying, currentTrack, likedSongs } = storeToRefs(useSong)

let isHover = ref(false)

let isTrackTime = ref(null)

const props = defineProps({
  track: Object,
  artist: Object,
  index: Number
})
const { index, track } = toRefs(props)
let rawLikedSong = ref(toRaw(likedSongs.value))
let isLiked = ref(rawLikedSong.value.some((song) => song.id == track.value.id))
onMounted(() => {
  const audio = new Audio(track.value.path)
  audio.addEventListener('loadedmetadata', function () {
    const duration = audio.duration
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
    isTrackTime.value = minutes + ':' + seconds.toString().padStart(2, '0')
  })
})

const addLikedSong = () => {
  useSong.addLikedSong(track.value)
  isLiked.value = true
  console.log('like')
}
const removeLikedSong = () => {
  useSong.removeLikedSong(track.value)
  isLiked.value = false
  console.log('dislike')
}
</script>
<template>
  <li
    class="flex items-center justify-between rounded-md hover:bg-[#2A2929]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="flex items-center w-full py-1.5">
      <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
        <Play
          v-if="!isPlaying"
          fillColor="#FFFFFF"
          :size="24"
          @click="useSong.playOrPauseThisSong(artist, track)"
        />
        <Play
          v-else-if="isPlaying && currentTrack.name !== track.name"
          fillColor="#FFFFFF"
          :size="24"
          @click="useSong.loadSong(artist, track)"
        />
        <Pause v-else fillColor="#FFFFFF" :size="24" @click="useSong.playOrPauseSong()" />
      </div>
      <div v-else class="text-zinc-400 font-semibold w-[40px] ml-5">
        <span :class="{ 'text-green-500': currentTrack && currentTrack.name === track.name }">
          {{ index }}
        </span>
      </div>
      <div class="text-white font-semibold">
        <div :class="{ 'text-green-500': currentTrack && currentTrack.name === track.name }">
          {{ track.name }}
        </div>
        <div class="text-sm font-semibold text-gray-400">{{ artist.name }}</div>
      </div>
    </div>
    <div class="flex items-center">
      <button @click="isLiked ? removeLikedSong() : addLikedSong()" type="button" v-if="true">
        <Heart :class="isLiked ? 'text-green-500' : 'text-zinc-400'" :size="22" />
      </button>
      <div v-if="isTrackTime" class="text-xs mx-5 text-gray-400">
        {{ isTrackTime }}
      </div>
    </div>
  </li>
</template>
