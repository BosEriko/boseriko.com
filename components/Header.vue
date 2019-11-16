<template>
  <header class="bg-white border-b mb-auto">
    <div class="flex items-center mx-auto container">
      <div v-if="!isMenuActive" class="mr-auto">
        <img class="h-10" src="/img/logo.png" alt="Bos Eriko" />
      </div>
      <ul v-if="isMenuActive" class="mr-auto flex">
        <li class="mr-10">
          <a class="hover:underline" href="/github">GitHub</a>
        </li>
        <li class="mr-10">
          <a class="hover:underline" href="/dev">DEV</a>
        </li>
        <li class="mr-10">
          <a class="hover:underline" href="/twitch">Twitch</a>
        </li>
        <li>
          <a class="hover:underline" href="/twitter">Twitter</a>
        </li>
      </ul>
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
