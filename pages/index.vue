<template>
  <div class="container">
    <div class="m-4">
      <h1 class="title">Netlify Functions Test</h1>
      <button
        class="
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
      <pre v-if="data">{{ data }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    }
  },
  methods: {
    async fetchData() {
      const response = await this.$axios.get('/api/hello')
      this.data = response.data
    },
  },
}
</script>

<style></style>
