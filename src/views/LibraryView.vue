<script setup>
import SongRow from '@/components/SongRow.vue'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import ClockTimeThreeOutline from 'vue-material-design-icons/ClockTimeThreeOutline.vue'
import artist from '@/artist.json'

import { onMounted } from 'vue'
import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'

const useSong = useSongStore()
const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)

onMounted(() => {})

const playFunc = () => {
  if (currentTrack.value) {
    useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value)
    return
  }
  useSong.playFromFirst()
}
</script>

<template>
  <div class="p-4 sm:p-8 overflow-x-hidden">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Album
    </button>

    <div class="py-1.5"></div>

    <div class="flex items-center w-full">
      <div
        class="max-w-[100px] min-w-[100px] h-[100px] sm:max-w-[140px] sm:min-w-[140px] sm:h-[140px] overflow-hidden"
      >
        <img class="w-full h-full object-cover" :src="artist.albumCover" alt="" />
      </div>
      <div class="w-full ml-5">
        <div class="text-[29px] text-white w-full hover:underline cursor-pointer font-bosemiboldld">
          {{ artist.name }}
        </div>
        <div class="text-gray-300 mb-2 text-[13px] flex">
          <div class="flex">Album</div>
          <div class="ml-2 flex items-center gap-2">
            <span>•</span>
            <span>{{ artist.releaseYear }}</span>
            <span>•</span>
            <span>{{ artist.tracks.length }} songs</span>
          </div>
        </div>
        <div class="flex gap-4 items-center justify-start mb-1.5">
          <button class="p-1 rounded-full bg-white" @click="playFunc()">
            <Play v-if="!isPlaying" fillColor="#181818" :size="25" />
            <Pause v-else fillColor="#181818" :size="25" />
          </button>
          <button type="button">
            <Heart fillColor="#1BD760" :size="30" />
          </button>
          <button type="button">
            <DotsHorizontal fillColor="#FFFFFF" :size="25" />
          </button>
        </div>
      </div>
    </div>
    <div class="mt-6"></div>
    <div class="flex items-center justify-between px-5 pt-2">
      <div class="flex items-center justify-between text-gray-400">
        <div class="mr-7">#</div>
        <div class="text-sm">Title</div>
      </div>
      <div><ClockTimeThreeOutline fillColor="#FFFFFF" :size="18" /></div>
    </div>
    <div class="border-b border-b-[#2A2A2A] mt-2"></div>
    <div class="mb-4"></div>
    <ul class="w-full" v-for="(track, index) in artist.tracks" :key="track">
      <SongRow :artist="artist" :track="track" :index="++index" />
    </ul>
  </div>
</template>
