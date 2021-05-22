<template>
  <div class="m-4">
    <h1 class="title text-2xl font-bold">Netlify Functions Test</h1>
    <button
      class="
        my-4
        py-2
        px-4
        font-bold
        text-white
        bg-indigo-500
        hover:bg-indigo-700
        rounded-md
        transition-color
        duration-300
      "
      @click="fetchData"
    >
      <span v-if="claps">{{ claps }} Clap!</span>
      <span v-else>Clap!</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      claps: 0,
    }
  },
  computed: {
    hasData() {
      return Object.keys(this.data).length > 0
    },
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      const response = await this.$axios.get('/api/hello')
      this.isLoading = false
      this.data = response.data
    },
  },
}
</script>

<style></style>
