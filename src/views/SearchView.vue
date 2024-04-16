<script setup>
import CategorySelect from '@/components/CategorySelect.vue'
</script>

<template>
  <div class="p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Browse all
    </button>

    <div class="py-1.5"></div>

    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
      <CategorySelect
        category="Podcasts"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
      <CategorySelect
        category="Audiobooks"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
      <CategorySelect
        category="Made For You"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
      <CategorySelect
        category="New Releases"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
      <CategorySelect
        category="Chill Vibes"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
      <CategorySelect
        category="Explore Indie"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
      <CategorySelect
        category="Throwback Classics"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
      <CategorySelect
        category="Focus & Study"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
      <CategorySelect
        category="Party Hits"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
      <CategorySelect
        category="Wellness & Fitness"
        :image="`https://source.unsplash.com/random/300x300?sig=${Math.random()}`"
      />
    </div>
  </div>
</template>
