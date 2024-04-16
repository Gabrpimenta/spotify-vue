<script setup>
import { toRefs, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  image: String,
  title: String,
  subTitle: String
})
const { image, title, subTitle } = toRefs(props)

const isImageLoaded = ref(false)
</script>

<template>
  <RouterLink v-show="isImageLoaded" to="library">
    <div
      class="bg-[#111111] p-2 sm:p-4 max-w-[253px] contrast-[2] brightness-[0.87] rounded-xl relative overflow-hidden"
    >
      <img class="rounded-md" :src="image" alt="" @load="isImageLoaded = true" />
      <div class="text-white pt-4 font-semibold text-[17px] text-nowrap overflow-hidden">
        {{ title }}
      </div>
      <div class="text-gray-400 pt-1 pb-3 text-[14px]">{{ subTitle }}</div>
    </div>
  </RouterLink>
</template>
