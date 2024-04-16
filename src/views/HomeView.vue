<script setup>
import HomeCard from '@/components/HomeCard.vue'
</script>

<template>
  <div class="p-5 sm:p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Podcasts of the Week
    </button>

    <div class="py-1.5"></div>

    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Serene Sunset"
        subTitle="Nature's Beauty"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Tech Innovations"
        subTitle="Shaping Tomorrow"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Urban Explorations"
        subTitle="City Vibes"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Whispers of Wisdom"
        subTitle="Timeless Tales"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Mystic Moonlight"
        subTitle="Night's Embrace"
      />
    </div>
  </div>
  <div class="p-5 sm:p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Recommended Radio
    </button>

    <div class="py-1.5"></div>

    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Digital Dreams"
        subTitle="Virtual Realities"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Whimsical Wonderland"
        subTitle="Fantasy Adventure"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Harmony in Chaos"
        subTitle="Balancing Act"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Ethereal Echoes"
        subTitle="Memories Unfolding"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Journey Beyond Stars"
        subTitle="Cosmic Odyssey"
      />
    </div>
  </div>
  <div class="p-5 sm:p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      You might like this
    </button>

    <div class="py-1.5"></div>

    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Digital Dreams"
        subTitle="Virtual Realities"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Whimsical Wonderland"
        subTitle="Fantasy Adventure"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Harmony in Chaos"
        subTitle="Balancing Act"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Ethereal Echoes"
        subTitle="Memories Unfolding"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Journey Beyond Stars"
        subTitle="Cosmic Odyssey"
      />
    </div>
  </div>
  <div class="p-5 sm:p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Can be cool
    </button>

    <div class="py-1.5"></div>

    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Digital Dreams"
        subTitle="Virtual Realities"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Whimsical Wonderland"
        subTitle="Fantasy Adventure"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Harmony in Chaos"
        subTitle="Balancing Act"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Ethereal Echoes"
        subTitle="Memories Unfolding"
      />
      <HomeCard
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
        title="Journey Beyond Stars"
        subTitle="Cosmic Odyssey"
      />
    </div>
  </div>
</template>
