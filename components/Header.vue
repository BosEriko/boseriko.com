<template>
  <header class="border-b mb-auto py-3 lg:p-0">
    <div class="flex items-center mx-auto container">
      <div class="mr-auto">
        <img class="h-10" src="/img/logo.png" alt="Bos Eriko" />
      </div>
      <ul v-if="isMenuActive" class="flex">
        <li class="mr-10">
          <a
            class="hover:underline"
            href="http://github.boseriko.com/"
            target="_blank"
          >
            GitHub
          </a>
        </li>
        <li class="mr-10">
          <a
            class="hover:underline"
            href="https://dev.to/boseriko"
            target="_blank"
          >
            DEV
          </a>
        </li>
        <li class="mr-10">
          <a
            class="hover:underline"
            href="http://kitsu.boseriko.com/"
            target="_blank"
          >
            Anime
          </a>
        </li>
        <li class="mr-10">
          <a
            class="hover:underline"
            href="http://twitch.boseriko.com/"
            target="_blank"
          >
            Twitch
          </a>
        </li>
        <li>
          <a
            class="hover:underline"
            href="http://twitter.boseriko.com/"
            target="_blank"
          >
            Twitter
          </a>
        </li>
      </ul>
      <div class="hidden lg:block">
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
@import url('../assets/css/hamburgers.css');

button:focus {
  outline: none;
}
.hamburger {
  transform: scale(0.5, 0.5);
}
</style>
