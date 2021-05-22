<template>
  <button
    class="
      clap-button
      my-4
      py-2
      px-4
      font-bold
      text-green-700 text-3xl
      bg-green-200
      hover:bg-green-300
      rounded-md
      transition-color
      duration-300
    "
    :title="`${totalCount.toLocaleString()} claps`"
    @click="clap"
  >
    👏
    <span v-if="totalCount" class="ml-4">
      {{ totalCount.toLocaleString() }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
  },
  data() {
    return { count: 0, additionalCount: 0, timeout: null }
  },
  computed: {
    totalCount() {
      return this.count + this.additionalCount
    },
  },
  created() {
    this.fetchClaps()
  },
  methods: {
    clap() {
      // We have to buffer the additional claps, in the user clicks faster
      //   for an additional clap before the server has a time to process the request
      this.additionalCount += 1
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.updateClaps()
      }, 1000)
    },
    async fetchClaps() {
      if (this.id) {
        const response = await this.$axios.get(`/api/claps/${this.id}`)
        this.count = response.data.count
      }
    },
    async updateClaps() {
      try {
        if (this.id) {
          const response = await this.$axios.post(`/api/claps`, {
            id: this.id,
            count: this.additionalCount,
          })
          this.count = response.data.count
          this.additionalCount = 0
        }
      } catch (error) {
        this.additionalCount = 0
      }
    },
  },
}
</script>

<style>
.clap-button {
  touch-action: manipulation;
}
</style>
