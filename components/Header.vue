<template>
  <header class="bg-white p-5">
    <div class="mx-auto container">
      Heyoooo!
    </div>
    <button
      @click="toggleMenu"
      :class="
        `
        fixed
        top-0
        right-0
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
  transform: scale(0.75, 0.75);
}
</style>
