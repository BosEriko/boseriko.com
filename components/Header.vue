<template>
  <header class="bg-white p-5">
    <div class="mx-auto container"></div>
    <button
      @click="toggleMenu"
      :class="`hamburger hamburger--slider ${isMenuActive ? 'is-active' : ''}`"
      type="button"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
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
