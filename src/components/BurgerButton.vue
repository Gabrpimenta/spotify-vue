<script setup>
import { toRef, watch, watchEffect } from 'vue'
defineProps(['openMobileMenu'])
</script>

<template>
  <button
    @click="openMobileMenu"
    class="bg-black block sm:hidden hover:bg-[#282828] rounded-full p-1 mr-5 mt-0.5 cursor-pointer"
  >
    <svg width="29px" height="29px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 18L20 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
      <path d="M4 12L20 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
      <path d="M4 6L20 6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
</template>
