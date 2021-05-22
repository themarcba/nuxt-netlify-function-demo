<template>
  <div class="claps m-4">
    <clap-button id="test-as" />
  </div>
</template>

<script>
export default {
  methods: {
    async createClap() {
      const response = await this.$axios.post(`/api/claps`, {
        id: Math.floor(Math.random() * 99999999).toString(),
      })
      this.claps = response.data.claps
    },
  },
}
</script>

<style></style>
