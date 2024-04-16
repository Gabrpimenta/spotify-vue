<script setup>
import { ref, onMounted } from 'vue'

import VolumeMute from 'vue-material-design-icons/VolumeMute.vue'
import VolumeHigh from 'vue-material-design-icons/VolumeHigh.vue'

import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'

const useSong = useSongStore()
const { audio, volume: AudioVolume } = storeToRefs(useSong)

let isHover = ref(false)

let vol = ref(AudioVolume.value * 100)
let volume = ref(null)
let volBeforeMute = ref(80)
onMounted(() => {
  audio.value.volume = AudioVolume.value
  volume.value.addEventListener('input', (e) => {
    AudioVolume.value = e.currentTarget.value / 100
    audio.value.volume = AudioVolume.value
  })
})
const muteMusic = () => {
  volBeforeMute.value = AudioVolume.value
  AudioVolume.value = 0
  vol.value = 0
  audio.value.volume = 0
  console.log(volBeforeMute.value)
}
const unMuteMusic = () => {
  AudioVolume.value = volBeforeMute.value
  vol.value = volBeforeMute.value * 100
  audio.value.volume = AudioVolume.value
}
</script>
<template>
  <div class="cursor-pointer" v-if="vol == 0" @click="unMuteMusic">
    <VolumeMute class="text-zinc-300 hover:text-white" :size="20" />
  </div>
  <div class="cursor-pointer" v-else @click="muteMusic">
    <VolumeHigh class="text-zinc-300 hover:text-white" :size="20" />
  </div>
  <div
    class="flex items-center ml-2 w-[150px] rounded-full relative mt-2 mb-[23px]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <input
      v-model="vol"
      ref="volume"
      type="range"
      class="cursor-pointer mt-[24px] absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
      :class="{ rangeDotHidden: !isHover }"
    />
    <div
      class="pointer-events-none rounded-full mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
      :style="`width: ${vol}%;`"
      :class="isHover ? 'bg-green-500' : 'bg-white'"
    />
    <div
      class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
    />
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
