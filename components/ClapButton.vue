<template>
  <button
    class="
      clap-button
      my-4
      py-2
      px-4
      font-bold
      text-white
      bg-green-500
      hover:bg-green-700
      rounded-md
      transition-color
      duration-300
    "
    @click="updateClaps"
  >
    <span v-if="count">{{ count }} Clap!</span>
    <span v-else>Clap!</span>
  </button>
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
  },
  data() {
    return { count: 0 }
  },
  created() {
    this.fetchClaps()
  },
  methods: {
    async fetchClaps() {
      if (this.id) {
        const response = await this.$axios.get(`/api/claps/${this.id}`)
        this.count = response.data.count
      }
    },
    async updateClaps() {
      if (this.id) {
        const response = await this.$axios.post(`/api/claps`, { id: this.id })
        this.count = response.data.count
      }
    },
  },
}
</script>

<style></style>
