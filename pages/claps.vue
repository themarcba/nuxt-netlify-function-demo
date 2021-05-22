<template>
  <div class="claps m-4">
    <h1 class="text-3xl font-bold text-green-500">Serverless Clap Button</h1>
    <clap-button id="test-clap-button7" />
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
