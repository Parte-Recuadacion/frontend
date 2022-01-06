<template>
  <div>
    <!--nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/"> </a>
      </div>
    </nav-->

    <section class="main-content columns">
      <aside
        v-show="
          $route.name !== 'manegement' &&
            !loading &&
            parseInt(
              moment()
                .locale('es')
                .format('D')
            ) < 6
        "
        class="column is-3 section has-text-centered"
      >
        <b
          class="menu-label is-hidden-touch has-text-centered"
          style="color: #0855f5; font-size: 16px"
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
            v-for="(province, index) in provinciasFaltantes"
            :key="index"
            class="margin-bottom-5"
            style="width: 75%; margin-left: 50px"
            @click="chosenProvince(index)"
          >
            <button
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
import moment from 'moment'
import provinceMissingQuery from '~/apollo/queries/provinceMissing.graphql'

export default {
  data() {
    return {
      provinciasFaltantes: null,
      selectedProvince: [],
      loading: true,
      moment
    }
  },
  beforeMount() {
    this.$apollo.query({ query: provinceMissingQuery }).then(({ data }) => {
      this.provinciasFaltantes = data.provinceMissing
      this.loading = false
    })
  },
  methods: {
    chosenProvince(index) {
      this.selectedProvince = []
      this.selectedProvince.push(Number(index))
      this.$store.commit('updateDpa', this.provinciasFaltantes[index].dpa)
      this.$store.commit('updateNombre', this.provinciasFaltantes[index].nombre)
    }
  }
}
</script>
<style lang="stylus" scoped></style>
