<template>
  <header class="bg-white">
    <div class="flex items-center mx-auto container">
      <h1 class="mr-auto">Bos Eriko</h1>
      <button
        @click="toggleMenu"
        :class="
          `
            hamburger
            hamburger--slider
            ${isMenuActive ? 'is-active' : ''}
          `
        "
        type="button"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  data: () => {
    return {
      isMenuActive: false
    }
  },
  methods: {
    // eslint-disable-next-line
    toggleMenu: function () {
      this.isMenuActive = !this.isMenuActive
    }
  }
}
</script>

<style scoped>
button:focus {
  outline: none;
}
.hamburger {
  transform: scale(0.5, 0.5);
}
</style>
