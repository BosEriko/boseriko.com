<template>
  <div class="tracking-wider min-h-screen text-xl subpixel-antialiased">
    <link
      href="https://fonts.googleapis.com/css?family=Lekton&display=swap"
      rel="stylesheet"
    />
    <div class="flex flex-col min-h-screen">
      <Header />
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Lekton', sans-serif;
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
