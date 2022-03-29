<template>
  <div id="app">
    <div class="flex">
      <div class="mode-toggle" :class="darkDark" @click="modeToggle">
        <div class="toggle">
          <div id="dark-mode" type="checkbox"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false
    }
  },
  computed: {
    darkDark() {
      return this.darkMode && 'darkmode-toggled'
    }
  },
  methods: {
    dark() {
      document.querySelector('body').classList.add('dark-mode')
      this.darkMode = true
      this.$store.commit('updateDarkMode', true)
      this.$emit('dark')
    },

    light() {
      document.querySelector('body').classList.remove('dark-mode')
      this.darkMode = false
      this.$store.commit('updateDarkMode', false)
      this.$emit('light')
    },

    modeToggle() {
      if (
        this.darkMode ||
        document.querySelector('body').classList.contains('dark-mode')
      ) {
        this.light()
      } else {
        this.dark()
      }
    }
  }
}
</script>

<style scoped></style>
