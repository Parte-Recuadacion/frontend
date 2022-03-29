<template>
  <div>
    <aside
      v-show="
        $route.name !== 'manegement' &&
          !loading &&
          parseInt(moment().weekday()) < 3 &&
          parseInt(moment().weekday()) !== 0
      "
      class=" has-text-centered"
    >
      <b
        class="menu-label is-hidden-touch has-text-centered margin-top-10"
        style="color: #4099FF; font-size: 16px"
      >
        Provincias que faltan
      </b>
      <br />
      <b class="menu-label is-hidden-touch has-text-centered">
        (Seleccione su provincia)
      </b>
      <ul class="menu-list margin-top-10">
        <div
          v-for="(province, index) in provincias"
          :key="index"
          class="margin-bottom-5"
          @click="chosenProvince(index)"
        >
          <button
            v-show="!getDarkMode"
            class="is-primary is-fullwidth has-text-left"
            style="height: 50px !important; width: 100%; padding-left: 25px; padding-right: 25px; border: solid #ced2e1 1pt; border-radius: 10px !important;"
            :style="
              selectedProvince.indexOf(Number(index)) !== -1
                ? `border: solid #0855f5 1pt; box-shadow: 0 0 5px #0855f5`
                : ''
            "
          >
            <p style="font-size: 18px; padding-top: 7px">
              {{ province.dpa + ' - ' + province.nombre }}
            </p>
          </button>
          <button
            v-show="getDarkMode"
            class="is-primary is-fullwidth has-text-left"
            style="height: 50px !important; width: 100%; padding-left: 25px; padding-right: 25px; border: solid #000000 1pt; background-color: #171717 !important; border-radius: 10px !important;"
            :style="
              selectedProvince.indexOf(Number(index)) !== -1
                ? `border: solid #4099FF 1pt; box-shadow: 0 0 10px #4099FF; background-color: #4099FF !important;`
                : ''
            "
          >
            <p style="font-size: 18px; padding-top: 7px">
              {{ province.dpa + ' - ' + province.nombre }}
            </p>
          </button>
          <br />
        </div>
      </ul>
    </aside>
  </div>
</template>

<script>
// Components && Vue library
import moment from 'moment'

// Apollo
import provinceMissingQuery from '~/apollo/queries/provinceMissing.graphql'

export default {
  data() {
    return {
      provinciasFaltantes: null,
      loading: true,
      moment
    }
  },
  computed: {
    provincias() {
      return this.$store.getters.getProvince
    },
    selectedProvince() {
      return this.$store.getters.getChosenProvince
    },
    getDarkMode() {
      return this.$store.getters.getDarkMode
    }
  },
  beforeMount() {
    this.$apollo.query({ query: provinceMissingQuery }).then(({ data }) => {
      this.provinciasFaltantes = data.provinceMissing
      this.loading = false
      this.$store.commit('updateMissingProvince', this.provinciasFaltantes)
      this.$store.commit('setUpdated', true)
    })
  },
  methods: {
    chosenProvince(index) {
      this.$store.commit('updateChosenProvince', index)
      this.$store.commit('updateDpa', this.provinciasFaltantes[index].dpa)
      this.$store.commit('updateNombre', this.provinciasFaltantes[index].nombre)
      this.$store.commit('updateIndex', index)
      this.$store.commit('setActualProvince', null)
      this.$store.commit('setSendedInfo', false)
    }
  }
}
</script>
<style></style>
