<template>
  <div class="tracking-wider min-h-screen text-xl subpixel-antialiased">
    <div class="flex flex-col min-h-screen">
      <Header />
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');

body {
  font-family: 'Open Sans Condensed', sans-serif;
}

.smooth {
  transition: all 0.25s ease-in-out;
}
</style>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
