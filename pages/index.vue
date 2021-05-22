<template>
  <div class="claps m-4">
    <h1 class="text-3xl font-bold text-green-500">Serverless Clap Button</h1>
    <p class="text-gray-500 mt-4">Click the button to clap 👏</p>
    <p class="text-gray-500 mt-4">
      This will be saved via a serverless Netlify function to a FaunaDB
      database. You can click as many times as you want. In fact, go crazy!
      Let's see how high we come.
    </p>

    <clap-button name="demo-clap-button" />
    <p class="text-gray-500">
      Made for fun by
      <a
        href="https://twitter.com/themarcba"
        class="font-bold text-green-500 hover:underline"
      >
        Marc Backes</a
      >. The code is openly available on
      <a
        href="https://github.com/themarcba/nuxt-netlify-function-demo"
        class="font-bold text-green-500 hover:underline"
      >
        GitHub</a
      >.
    </p>
  </div>
</template>
