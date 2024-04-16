<script setup>
import { ref, toRefs } from 'vue'
import { RouterLink } from 'vue-router'
import uniqolor from 'uniqolor'

let randColor = ref('')
randColor.value = uniqolor.random()
const props = defineProps({
  image: String,
  category: String
})
const { image, category } = toRefs(props)

const isImageLoaded = ref(false)
</script>

<template>
  <RouterLink v-show="isImageLoaded" to="library">
    <div
      v-if="randColor.color"
      :style="`background-color: ${randColor.color};`"
      class="max-w-[253px] group contrast-[2] brightness-[0.87] rounded-xl aspect-square relative overflow-hidden"
    >
      <div class="text-white pt-3 pl-4 font-semibold text-[20px] sm:text-[23px]">
        {{ category }}
      </div>
      <img
        class="absolute contrast-[0.55] -z-30 -right-3 group-hover:-right-0 bottom-0 max-w-[70%] rounded-md rotate-[25deg] group-hover:max-w-full group-hover:rotate-[0deg] transition-max-w transition-rotate duration-200 ease-in-out"
        :src="image || ''"
        @load="isImageLoaded = true"
      />
    </div>
  </RouterLink>
</template>
