<template>
  <div>
    <b-button size="is-small" @mouseover="open = true"></b-button>
    <section>
      <b-sidebar
        v-model="open"
        type="is-light"
        :fullheight="true"
        :fullwidth="true"
        :overlay="false"
      >
        <div class="p-1">
          <MissingProvince :open="open" />
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
import MissingProvince from '~/components/MissingProvince'
export default {
  components: { MissingProvince },
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="stylus">
.p-1
  padding: 2em
.button.is-small
  height 100% !important
  z-index 1 !important
  position absolute !important
  top 0 !important
  width 75px !important
  left 0 !important
  margin-left -70px !important
</style>
