<template>
  <div>
    <section class="main-content columns">
      <aside
        v-show="
          $route.name !== 'manegement' &&
            !loading &&
            parseInt(moment().weekday()) < 6 &&
            parseInt(moment().weekday()) !== 0
        "
        class="column is-3 section has-text-centered"
      >
        <b
          class="menu-label is-hidden-touch has-text-centered"
          :style="
            isOn
              ? 'color: #FFFFFF; font-size: 16px'
              : 'color: #0855f5; font-size: 16px'
          "
        >
          Provincias que faltan
        </b>
        <br />
        <b class="menu-label is-hidden-touch has-text-centered">
          (Seleccione su provincia)
        </b>
        <ul
          class="menu-list"
          style="border: solid #ced2e1 1pt; padding-top: 10px; padding-bottom: 10px"
        >
          <div
            v-for="(province, index) in provincias"
            :key="index"
            class="margin-bottom-5"
            style="width: 75%; margin-left: 50px"
            @click="chosenProvince(index)"
          >
            <button
              v-show="!isOn"
              class="is-primary is-fullwidth has-text-left"
              style="height: 50px !important; width: 100%; padding-left: 20px; border: solid #ced2e1 1pt"
              :style="
                selectedProvince.indexOf(Number(index)) !== -1
                  ? `border: solid #0855f5 1pt; box-shadow: 0 0 5px #0855f5`
                  : ''
              "
            >
              <p style="font-size: 18px">
                {{ province.dpa + ' ' + province.nombre }}
              </p>
              <p />
            </button>
            <button
              v-show="isOn"
              class="is-primary is-fullwidth has-text-left"
              style="height: 50px !important; width: 100%; padding-left: 20px; border: solid #ced2e1 1pt"
              :style="
                selectedProvince.indexOf(Number(index)) !== -1
                  ? `border: solid #ffffff 2pt; box-shadow: 0 0 10px #ffffff`
                  : ''
              "
            >
              <p style="font-size: 18px">
                {{ province.dpa + ' ' + province.nombre }}
              </p>
              <p />
            </button>
            <br />
          </div>
        </ul>
      </aside>
      <div v-if="$route.name !== 'manegement'" class="container column is-10">
        <Nuxt />
      </div>
    </section>
    <div v-if="$route.name === 'manegement'">
      <Nuxt />
    </div>
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
    isOn() {
      return this.$store.getters.getValue
    }
  },
  beforeMount() {
    this.$apollo.query({ query: provinceMissingQuery }).then(({ data }) => {
      this.provinciasFaltantes = data.provinceMissing
      this.loading = false
      this.$store.commit('updateMissingProvince', this.provinciasFaltantes)
    })
  },
  methods: {
    chosenProvince(index) {
      this.$store.commit('updateChosenProvince', index)
      this.$store.commit('updateDpa', this.provinciasFaltantes[index].dpa)
      this.$store.commit('updateNombre', this.provinciasFaltantes[index].nombre)
      this.$store.commit('updateIndex', index)
    }
  }
}
</script>
<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body div {
  background-color: #091a28;
  color: rgb(29, 155, 240);
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
