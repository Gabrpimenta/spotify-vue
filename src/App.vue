<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import MenuItem from './components/MenuItem.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import BurgerButton from './components/BurgerButton.vue'

import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'

import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'

// import artist from '@/artist.json'
import router from './router'
const useSong = useSongStore()
const { isPlaying, currentTrack } = storeToRefs(useSong)

let isMobileMenuOpen = ref(false)

onMounted(() => {
  // isPlaying.value = true
  // useSong.loadSong(artist, artist.tracks[0])
  // useSong.loadDefaultSong()
  isPlaying.value = false
})
let openMenu = ref(false)

const openMobileMenu = () => {
  console.log('opened')
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="flex flex-col h-[100vh] justify-between">
    <div class="flex h-full overflow-hidden">
      <div id="SideNav" class="h-full p-6 w-[240px] z-50 bg-black hidden sm:block">
        <RouterLink to="/">
          <img width="125" src="/images/icons/spotify-logo.png" />
        </RouterLink>
        <div class="my-8"></div>
        <ul>
          <RouterLink to="/">
            <MenuItem class="ml-[1px]" :iconSize="23" name="Home" iconString="home" pageUrl="/" />
          </RouterLink>
          <RouterLink to="/search">
            <MenuItem
              class="ml-[1px]"
              :iconSize="23"
              name="Search"
              iconString="search"
              pageUrl="/search"
            />
          </RouterLink>
          <RouterLink to="/library">
            <MenuItem
              class="ml-[1px]"
              :iconSize="23"
              name="Library"
              iconString="library"
              pageUrl="/library"
            />
          </RouterLink>
          <div class="my-3.5 border-t border-t-[#2A2A2A]"></div>
          <MenuItem
            :iconSize="24"
            name="Create Playlist"
            iconString="playlist"
            pageUrl="/playlist"
          />
          <RouterLink to="/liked">
            <MenuItem
              class="-ml-[1px]"
              :iconSize="27"
              name="Liked Songs"
              iconString="liked"
              pageUrl="/liked"
            />
          </RouterLink>
        </ul>
        <div class="border-t mt-2 border-t-[#2A2A2A]">
          <ul>
            <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
              My Playlist #1
            </li>
            <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
              My Playlist #2
            </li>
            <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
              My Playlist #3
            </li>
            <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
              My Playlist #4
            </li>
          </ul>
        </div>
      </div>

      <div
        class="flex w-full flex-col overflow-auto right-0 top-0 bg-gradient-to-b from-[#1C1C1C] to-black"
      >
        <div
          class="w-full h-[60px] p-2 sticky top-0 right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between"
        >
          <div class="flex items-center ml-6">
            <button
              type="button"
              @click="router.go(-1)"
              class="rounded-full bg-black p-[1px] cursor-pointer"
            >
              <ChevronLeft fillColor="#FFFFFF" :size="30" />
            </button>
            <button
              type="button"
              @click="router.go(1)"
              class="rounded-full ml-4 bg-black p-[1px] cursor-pointer"
            >
              <ChevronRight fillColor="#FFFFFF" :size="30" />
            </button>
          </div>
          <div class="flex">
            <button
              @click="openMenu = !openMenu"
              :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
              class="bg-black hover:bg-[#282828] rounded-full p-1 mr-3 sm:mr-8 mt-0.5 cursor-pointer"
            >
              <div class="flex items-center">
                <img
                  class="rounded-full"
                  width="31"
                  src="https://upload.wikimedia.org/wikipedia/commons/7/77/Avatar_cat.png"
                />
                <div class="text-white text-[14px] ml-1.5 font-semibold">Profile</div>
                <ChevronDown
                  class="mb-[-3px]"
                  v-if="openMenu"
                  @click="openMenu = true"
                  fillColor="#FFFFFF"
                  :size="25"
                />

                <ChevronUp
                  class="mb-[-3px]"
                  v-else
                  @click="openMenu = false"
                  fillColor="#FFFFFF"
                  :size="25"
                />
              </div>
            </button>
            <BurgerButton :openMobileMenu="openMobileMenu" />
          </div>
          <span
            v-if="openMenu"
            class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer"
          >
            <ul class="text-gray-200 font-semibold text-[14px]">
              <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">Profile</li>
              <li class="px-3 py-2.5 hover:bg-[#3E3D3D]">Log out</li>
            </ul>
          </span>
        </div>
        <!-- <perfect-scrollbar> <RouterView /> </perfect-scrollbar> -->
        <RouterView />
      </div>
    </div>
    <MusicPlayer v-if="currentTrack" />
    <div
      v-if="isMobileMenuOpen"
      class="w-full sm:hidden pt-24 h-full z-10 absolute bg-gradient-to-b from-[#1C1C1C] to-black"
    >
      <div class="text-white flex flex-col justify-center gap-10 text-5xl text-center">
        <ul class="m-auto">
          <RouterLink @click.enter="openMobileMenu" to="/">
            <MenuItem
              class="my-8 text-4xl"
              :iconSize="23"
              name="Home"
              iconString="home"
              pageUrl="/"
              :fontSize="3"
            />
          </RouterLink>
          <RouterLink @click.enter="openMobileMenu" to="/search">
            <MenuItem
              class="my-8 text-4xl"
              :iconSize="23"
              name="Search"
              iconString="search"
              pageUrl="/search"
            />
          </RouterLink>
          <RouterLink @click.enter="openMobileMenu" to="/library">
            <MenuItem
              class="my-8 text-4xl"
              :iconSize="23"
              name="Library"
              iconString="library"
              pageUrl="/library"
              :fontSize="20"
            />
          </RouterLink>
          <div class="my-3.5 border-t border-t-[#2A2A2A]"></div>

          <RouterLink @click.enter="openMobileMenu" to="/liked">
            <MenuItem
              class="my-8 text-4xl"
              :iconSize="27"
              name="Liked Songs"
              iconString="liked"
              pageUrl="/liked"
              :fontSize="24"
            />
          </RouterLink>
        </ul>
      </div>
    </div>
  </div>
</template>
