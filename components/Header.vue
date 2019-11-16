<template>
  <header class="bg-white border-b">
    <div class="flex items-center mx-auto container">
      <div v-if="!isMenuActive" class="mr-auto">
        <img class="h-10" src="/img/logo.png" alt="Bos Eriko" />
      </div>
      <ul class="mr-auto flex" v-if="isMenuActive">
        <li class="mr-5">
          <a class="hover:underline" href="/Github">GitHub</a>
        </li>
        <li class="mr-5">
          <a class="hover:underline" href="/Twitch">Twitch</a>
        </li>
        <li>
          <a class="hover:underline" href="/Twitter">Twitter</a>
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
