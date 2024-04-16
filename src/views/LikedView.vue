<script setup>
import SongRow from '@/components/SongRow.vue'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import ClockTimeThreeOutline from 'vue-material-design-icons/ClockTimeThreeOutline.vue'
import artist from '@/artist.json'

import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const useSong = useSongStore()
const { isPlaying, currentTrack, currentArtist, likedSongs } = storeToRefs(useSong)

onMounted(() => {
  //   console.log((currentArtist.value.tracks = likedSongs.value))
})

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
    <div class="py-1.5"></div>

    <div class="flex items-center w-full">
      <div
        class="max-w-[110px] min-w-[110px] sm:max-w-[140px] sm:min-w-[140px] h-[110px] sm:h-[140px] overflow-hidden"
      >
        <img class="w-full h-full object-cover" src="/images/icons/liked-songs-640.png" alt="" />
      </div>
      <div class="w-full ml-5">
        <div
          class="text-[19px] sm:text-[29px] text-white w-full hover:underline cursor-pointer font-bosemiboldld"
        >
          Liked Songs
        </div>
        <div class="text-gray-300 py-3 text-[13px] flex">
          <div class="flex items-center gap-2">
            <div class="flex items-center">
              <img
                class="rounded-full mb-[-2px]"
                width="20"
                src="https://upload.wikimedia.org/wikipedia/commons/7/77/Avatar_cat.png"
              />
              <div class="text-white text-[14px] ml-1.5 font-semibold">Profile</div>
            </div>
            <span>•</span>

            <span>{{ likedSongs.length }} {{ likedSongs.length == 1 ? 'song' : 'songs' }}</span>
          </div>
        </div>
        <div class="flex gap-4 items-center justify-start mb-1.5">
          <button class="p-1 rounded-full bg-white" @click="playFunc()">
            <Play v-if="!isPlaying" fillColor="#181818" :size="23" />
            <Pause v-else fillColor="#181818" :size="23" />
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
    <ul class="w-full" v-for="(track, index) in likedSongs" :key="track">
      <SongRow :artist="artist" :track="track" :index="++index" />
    </ul>
  </div>
</template>
