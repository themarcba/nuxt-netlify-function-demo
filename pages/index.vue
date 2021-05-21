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
      Load data
    </button>
    <pre v-if="hasData && !isLoading">{{ data }}</pre>
    <div v-else-if="isLoading">Hold on a second...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      isLoading: false,
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
