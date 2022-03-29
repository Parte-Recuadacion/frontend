<template>
  <div
    class="has-text-centered margin-bottom-40"
    style="width: 95%; margin-left: 2.5%"
  >
    <SideBar />
    <br />
    <div class="columns is-centered" style="margin-top: 50px !important;">
      <div class="column is-12 margin-top-20">
        <transition name="fade">
          <div v-if="provinceName && !getSendedInfo">
            <p class="has-text-centered font-size-7">
              {{ provinceDpa + ' - ' + provinceName }}
            </p>
          </div>
        </transition>
        <img
          v-show="getSendedInfo && getActualProvince !== null"
          class="margin-top-40"
          src="~/assets/correcto.png"
          style="width: 250px; height: 250px"
        />
        <p
          v-show="getSendedInfo && getActualProvince !== null"
          class="font-size-3"
        >
          {{
            'La provincia ' +
              getActualProvince +
              ' envió el parte de la recaudación correctamente'
          }}
        </p>
        <p
          v-show="
            !provinceName &&
              parseInt(moment().weekday()) < 3 &&
              parseInt(moment().weekday()) !== 0 &&
              !getSendedInfo &&
              getActualProvince === null
          "
          class="has-text-centered font-size-6"
        >
          * Seleccione su provincia en la parte izquierda *
        </p>
        <p
          v-show="
            !provinceName &&
              (parseInt(moment().weekday()) >= 3 ||
                parseInt(moment().weekday()) === 0) &&
              !getSendedInfo &&
              getActualProvince === null
          "
          class="has-text-centered font-size-6"
        >
          * Espere hasta el lunes para enviar la información del Parte
        </p>
        <div>
          <p
            v-show="
              parseInt(moment().weekday()) < 3 &&
                parseInt(moment().weekday()) !== 0 &&
                !getSendedInfo &&
                getActualProvince === null
            "
            class="has-text-centered"
          >
            * La información del parte debe enviarse en
            <span
              style="color: #0855f5; font-weight: bold"
              :style="getDarkMode ? 'color: #4099FF !important' : ''"
              >miles de pesos a un lugar después de la coma</span
            >
            todos los
            <span
              style="color: #0855f5; font-weight: bold"
              :style="getDarkMode ? 'color: #4099FF !important' : ''"
              >lunes</span
            >
            (o martes en casos excepcionales) antes las
            <span style="color: #0855f5; font-weight: bold">4:00pm</span>.
          </p>
          <br />
          <p
            v-show="
              parseInt(moment().weekday()) < 3 &&
                parseInt(moment().weekday()) !== 0 &&
                !getSendedInfo &&
                getActualProvince === null
            "
            class="has-text-centered"
            style="margin-top: -30px"
          >
            * Complete los presupuestos debajo y una vez que haya chequeado que
            todo esté correcto, hacer click en el botón
            <span
              style="color: #0855f5; font-weight: bold"
              :style="getDarkMode ? 'color: #4099FF !important' : ''"
              >Enviar información</span
            >.
          </p>
        </div>
        <div>
          <transition name="fade">
            <div v-if="provinceName && !getSendedInfo">
              <!-- start presupuesto central -->
              <div class="flex-wrap-center margin-top-20">
                <div
                  class="column is-4"
                  style="border-right: solid #ced2e1 1pt; padding-top: 30px; padding-bottom: 30px"
                >
                  <p
                    class="has-text-centered font-size-2 margin-bottom-10"
                    style="color: #0855f5; font-weight: bold"
                    :style="
                      getDarkMode
                        ? 'color: #4099FF !important'
                        : 'color: #0855f5'
                    "
                  >
                    Presupuesto Central
                  </p>
                  <hr style="margin-top: 10px" />

                  <!-- start plan -->
                  <div class="row is-flex">
                    <div class="column">
                      <VuetifyMoney
                        v-model="centralPlanMes"
                        :label="label1"
                        :readonly="readonly1"
                        :disabled="disabled1"
                        :outlined="outlined1"
                        :clearable="clearable1"
                        :options="options1"
                      />
                    </div>
                    <div class="column">
                      <VuetifyMoney
                        v-model="centralPlanAcumulado"
                        :label="label2"
                        :readonly="readonly2"
                        :disabled="disabled2"
                        :outlined="outlined2"
                        :clearable="clearable2"
                        :options="options2"
                        :background-color="red"
                      />
                    </div>
                  </div>
                  <!-- end plan -->
                  <!-- end presupuesto central -->

                  <!-- start Real -->
                  <div class="row is-flex">
                    <div class="column">
                      <VuetifyMoney
                        v-model="centralRealMes"
                        :label="label3"
                        :readonly="readonly3"
                        :disabled="disabled3"
                        :outlined="outlined3"
                        :clearable="clearable3"
                        :options="options3"
                      />
                    </div>
                    <div class="column">
                      <VuetifyMoney
                        v-model="centralRealAcumulado"
                        :label="label4"
                        :readonly="readonly4"
                        :disabled="disabled4"
                        :outlined="outlined4"
                        :clearable="clearable4"
                        :options="options4"
                      />
                    </div>
                  </div>
                  <!-- Real -->

                  <!-- start estimado -->

                  <div class="row is-flex">
                    <div class="column">
                      <VuetifyMoney
                        v-model="centralEstimadoMes"
                        :label="label5"
                        :readonly="readonly5"
                        :disabled="disabled5"
                        :outlined="outlined5"
                        :clearable="clearable5"
                        :options="options5"
                      />
                    </div>
                    <div class="column">
                      <VuetifyMoney
                        v-model="centralEstimadoAcumulado"
                        :label="label6"
                        :readonly="readonly6"
                        :disabled="disabled6"
                        :outlined="outlined6"
                        :clearable="clearable6"
                        :options="options6"
                      />
                    </div>
                  </div>
                  <!-- end estimado -->
                </div>
                <!-- end presupuesto Central -->

                <!-- start seguridad social -->
                <div
                  class="column is-4"
                  style="border-right: solid #ced2e1 1pt; padding-top: 20px; padding-bottom: 20px"
                >
                  <p
                    class="has-text-centered font-size-2 margin-bottom-10"
                    style="color: #0855f5; font-weight: bold"
                    :style="
                      getDarkMode
                        ? 'color: #4099FF !important'
                        : 'color: #0855f5'
                    "
                  >
                    Presupuesto Seg. Social
                  </p>
                  <hr style="margin-top: 10px" />

                  <!-- start plan -->
                  <div class="row is-flex">
                    <div class="column">
                      <VuetifyMoney
                        v-model="socialPlanMes"
                        :label="label7"
                        :readonly="readonly7"
                        :disabled="disabled7"
                        :outlined="outlined7"
                        :clearable="clearable7"
                        :options="options7"
                      />
                    </div>
                    <div class="column">
                      <VuetifyMoney
                        v-model="socialPlanAcumulado"
                        :label="label8"
                        :readonly="readonly8"
                        :disabled="disabled8"
                        :outlined="outlined8"
                        :clearable="clearable8"
                        :options="options8"
                      />
                    </div>
                  </div>

                  <!-- end plan -->

                  <!-- start Real -->
                  <div class="row is-flex">
                    <div class="column">
                      <VuetifyMoney
                        v-model="socialRealMes"
                        :label="label9"
                        :readonly="readonly9"
                        :disabled="disabled9"
                        :outlined="outlined9"
                        :clearable="clearable9"
                        :options="options9"
                      />
                    </div>
                    <div class="column">
                      <VuetifyMoney
                        v-model="socialRealAcumulado"
                        :label="label10"
                        :readonly="readonly10"
                        :disabled="disabled10"
                        :outlined="outlined10"
                        :clearable="clearable10"
                        :options="options10"
                      />
                    </div>
                  </div>
                  <!-- end Real -->

                  <!-- start estimado -->
                  <div class="row is-flex">
                    <div class="column">
                      <VuetifyMoney
                        v-model="socialEstimadoMes"
                        :label="label11"
                        :readonly="readonly11"
                        :disabled="disabled11"
                        :outlined="outlined11"
                        :clearable="clearable11"
                        :options="options11"
                      />
                    </div>
                    <div class="column">
                      <VuetifyMoney
                        v-model="socialEstimadoAcumulado"
                        :label="label12"
                        :readonly="readonly12"
                        :disabled="disabled12"
                        :outlined="outlined12"
                        :clearable="clearable12"
                        :options="options12"
                      />
                    </div>
                  </div>
                  <!-- end estimado -->
                </div>
                <!-- end seguridad social -->

                <!-- start Presupuesto Local -->
                <div
                  v-show="
                    provinceDpa !== 'F' &&
                      provinceDpa !== 'I' &&
                      provinceDpa !== 'C'
                  "
                  class="column is-4"
                >
                  <p
                    class="has-text-centered font-size-2 margin-bottom-10"
                    style="color: #0855f5; font-weight: bold"
                    :style="
                      getDarkMode
                        ? 'color: #4099FF !important'
                        : 'color: #0855f5'
                    "
                  >
                    Presupuesto Local
                  </p>
                  <hr style="margin-top: 10px" />
                  <!-- start plan -->

                  <div class="row is-flex">
                    <div class="column">
                      <VuetifyMoney
                        v-model="localPlanMes"
                        :label="label13"
                        :readonly="readonly13"
                        :disabled="disabled13"
                        :outlined="outlined13"
                        :clearable="clearable13"
                        :options="options13"
                      />
                    </div>
                    <div class="column">
                      <VuetifyMoney
                        v-model="localPlanAcumulado"
                        :label="label14"
                        :readonly="readonly14"
                        :disabled="disabled14"
                        :outlined="outlined14"
                        :clearable="clearable14"
                        :options="options14"
                      />
                    </div>
                  </div>
                  <!-- end plan -->

                  <!-- start Real -->
                  <div class="row is-flex">
                    <div class="column">
                      <VuetifyMoney
                        v-model="localRealMes"
                        :label="label15"
                        :readonly="readonly15"
                        :disabled="disabled15"
                        :outlined="outlined15"
                        :clearable="clearable15"
                        :options="options15"
                      />
                    </div>
                    <div class="column">
                      <VuetifyMoney
                        v-model="localRealAcumulado"
                        :label="label16"
                        :readonly="readonly16"
                        :disabled="disabled16"
                        :outlined="outlined16"
                        :clearable="clearable16"
                        :options="options16"
                      />
                    </div>
                  </div>
                  <!-- end Real -->

                  <!-- start estimado -->
                  <div class="row is-flex">
                    <div class="column">
                      <VuetifyMoney
                        v-model="localEstimadoMes"
                        :label="label17"
                        :readonly="readonly17"
                        :disabled="disabled17"
                        :outlined="outlined17"
                        :clearable="clearable17"
                        :options="options17"
                      />
                    </div>
                    <div class="column">
                      <VuetifyMoney
                        v-model="localEstimadoAcumulado"
                        :label="label18"
                        :readonly="readonly18"
                        :disabled="disabled18"
                        :outlined="outlined18"
                        :clearable="clearable18"
                        :options="options18"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <transition name="fade">
          <div v-if="provinceName" class="has-text-centered margin-top-20">
            <b-button
              v-if="
                provinceDpa !== 'F' &&
                  provinceDpa !== 'I' &&
                  provinceDpa !== 'C'
              "
              class="is-primary"
              style="width: 20%"
              :loading="loading"
              :disabled="
                !centralPlanMes ||
                  !centralPlanAcumulado ||
                  !centralRealMes ||
                  !centralRealAcumulado ||
                  !centralEstimadoMes ||
                  !centralEstimadoAcumulado ||
                  !socialPlanMes ||
                  !socialPlanAcumulado ||
                  !socialRealMes ||
                  !socialRealAcumulado ||
                  !socialEstimadoMes ||
                  !socialEstimadoAcumulado ||
                  !localPlanMes ||
                  !localPlanAcumulado ||
                  !localRealMes ||
                  !localRealAcumulado ||
                  !localEstimadoMes ||
                  !localEstimadoAcumulado ||
                  !provinceName
              "
              @click="sendInfo()"
            >
              Enviar información</b-button
            >
            <b-button
              v-else
              class="is-primary"
              style="width: 20%"
              :loading="loading"
              :disabled="
                !centralPlanMes ||
                  !centralPlanAcumulado ||
                  !centralRealMes ||
                  !centralRealAcumulado ||
                  !centralEstimadoMes ||
                  !centralEstimadoAcumulado ||
                  !socialPlanMes ||
                  !socialPlanAcumulado ||
                  !socialRealMes ||
                  !socialRealAcumulado ||
                  !socialEstimadoMes ||
                  !socialEstimadoAcumulado ||
                  !provinceName
              "
              @click="sendInfo()"
            >
              Enviar información</b-button
            >
          </div>
        </transition>
      </div>
    </div>

    <!-- end estimado -->
  </div>
</template>

<script>
// Components && Vue
import moment from 'moment'
import VuetifyMoney from '~/components/VuetifyMoney.vue'
import SideBar from '~/components/SideBar.vue'

// Apollo
import insertaDataMutation from '~/apollo/mutations/insertData.graphql'
import resetProvinceMutation from '~/apollo/mutations/resetProvince.graphql'
import resetListMutation from '~/apollo/mutations/resetList.graphql'

export default {
  components: {
    VuetifyMoney,
    SideBar
  },

  data: () => ({
    moment,
    status: '',
    status2: '',
    centralPlanMes: null,
    label1: 'Plan-Mes',
    readonly1: false,
    disabled1: false,
    outlined1: false,
    clearable1: true,
    options1: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    centralPlanAcumulado: null,
    label2: 'Plan-Acumulado',
    readonly2: false,
    disabled2: false,
    outlined2: false,
    clearable2: true,
    options2: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    centralRealMes: null,
    label3: 'Real-Mes',
    readonly3: false,
    disabled3: false,
    outlined3: false,
    clearable3: true,
    options3: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    centralRealAcumulado: null,
    label4: 'Real-Acumulado',
    readonly4: false,
    disabled4: false,
    outlined4: false,
    clearable4: true,
    options4: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    centralEstimadoMes: null,
    label5: 'Estimado-Mes',
    readonly5: false,
    disabled5: false,
    outlined5: false,
    clearable5: true,
    options5: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    centralEstimadoAcumulado: null,
    label6: 'Estimado-Acumulado',
    readonly6: false,
    disabled6: false,
    outlined6: false,
    clearable6: true,
    options6: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    socialPlanMes: null,
    label7: 'Plan-Mes',
    readonly7: false,
    disabled7: false,
    outlined7: false,
    clearable7: true,
    options7: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    socialPlanAcumulado: null,
    label8: 'Plan-Acumulado',
    readonly8: false,
    disabled8: false,
    outlined8: false,
    clearable8: true,
    options8: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    socialRealMes: null,
    label9: 'Real-Mes',
    readonly9: false,
    disabled9: false,
    outlined9: false,
    clearable9: true,
    options9: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    socialRealAcumulado: null,
    label10: 'Real-Acumulado',
    readonly10: false,
    disabled10: false,
    outlined10: false,
    clearable10: true,
    options10: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    socialEstimadoMes: null,
    label11: 'Estimado-Mes',
    readonly11: false,
    disabled11: false,
    outlined11: false,
    clearable11: true,
    options11: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    socialEstimadoAcumulado: null,
    label12: 'Estimado-Acumulado',
    readonly12: false,
    disabled12: false,
    outlined12: false,
    clearable12: true,
    options12: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    localPlanMes: null,
    label13: 'Plan-Mes',
    readonly13: false,
    disabled13: false,
    outlined13: false,
    clearable13: true,
    options13: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    localPlanAcumulado: null,
    label14: 'Plan-Acumulado',
    readonly14: false,
    disabled14: false,
    outlined14: false,
    clearable14: true,
    options14: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    localRealMes: null,
    label15: 'Real-Mes',
    readonly15: false,
    disabled15: false,
    outlined15: false,
    clearable15: true,
    options15: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    localRealAcumulado: null,
    label16: 'Real-Acumulado',
    readonly16: false,
    disabled16: false,
    outlined16: false,
    clearable16: true,
    options16: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    localEstimadoMes: null,
    label17: 'Estimado-Mes',
    readonly17: false,
    disabled17: false,
    outlined17: false,
    clearable17: true,
    options17: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    localEstimadoAcumulado: null,
    label18: 'Estimado-Acumulado',
    readonly18: false,
    disabled18: false,
    outlined18: false,
    clearable18: true,
    options18: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    status1: '',
    loading: false,
    isSwitched: false
  }),
  computed: {
    provinceName() {
      return this.$store.getters.getName
    },
    provinceDpa() {
      return this.$store.getters.getDpa
    },
    provincias() {
      return this.$store.getters.getProvince
    },
    updated() {
      return this.$store.getters.getUpdated
    },
    getDarkMode() {
      return this.$store.getters.getDarkMode
    },
    getActualProvince() {
      return this.$store.getters.getActualProvince
    },
    getSendedInfo() {
      return this.$store.getters.getSendedInfo
    }
  },
  beforeMount() {
    const day = moment().weekday()
    if (parseInt(day) >= 3) {
      this.$apollo.mutate({ mutation: resetListMutation }).then(({ data }) => {
        this.status1 = data.resetList
        console.log('aaaaa')
      })
    }
  },
  // mounted() {
  //   if (this.updated) {
  //     if (this.provincias.length === 0) {
  //       this.$apollo
  //         .mutate({ mutation: resetListMutation })
  //         .then(({ data }) => {
  //           this.status1 = data.resetList
  //           this.$store.commit('setUpdated', false)
  //         })
  //     }
  //   }
  // },
  methods: {
    sendInfo() {
      const getDate = moment()
        .locale('es')
        .format()
      let month = moment()
        .locale('es')
        .format('MMMM')
      month = month.charAt(0).toUpperCase() + month.slice(1)
      const year = moment()
        .locale('es')
        .format('YYYY')
      this.$buefy.dialog.confirm({
        title: 'Parte de la provincia ' + this.provinceName,
        message:
          'Una vez enviada la información no podrá ser cambiada, ¿ estás seguro de que es correcta ? ',
        confirmText: 'Si, estoy seguro',
        cancelText: 'No, deseo revisar',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true
          if (this.localPlanMes === null || this.localPlanMes === '') {
            this.localPlanMes = 0
            this.localPlanAcumulado = 0
            this.localRealMes = 0
            this.localRealAcumulado = 0
            this.localEstimadoMes = 0
            this.localEstimadoAcumulado = 0
          }
          this.$apollo
            .mutate({
              mutation: insertaDataMutation,
              variables: {
                dpa: this.provinceDpa,
                nombre: this.provinceName,
                enviadoA: getDate,
                enviadoEstaSemana: true,
                mes: month,
                anno: year,
                centralPlanMes: this.centralPlanMes,
                centralPlanAcumulado: this.centralPlanAcumulado,
                centralRealMes: this.centralRealMes,
                centralRealAcumulado: this.centralRealAcumulado,
                centralEstimadoMes: this.centralEstimadoMes,
                centralEstimadoAcumulado: this.centralEstimadoAcumulado,
                socialPlanMes: this.socialPlanMes,
                socialPlanAcumulado: this.socialPlanAcumulado,
                socialRealMes: this.socialRealMes,
                socialRealAcumulado: this.socialRealAcumulado,
                socialEstimadoMes: this.socialEstimadoMes,
                socialEstimadoAcumulado: this.socialEstimadoAcumulado,
                localPlanMes: this.localPlanMes,
                localPlanAcumulado: this.localPlanAcumulado,
                localRealMes: this.localRealMes,
                localRealAcumulado: this.localRealAcumulado,
                localEstimadoMes: this.localEstimadoMes,
                localEstimadoAcumulado: this.localEstimadoAcumulado
              }
            })
            .then(({ data }) => {
              this.status = data.insertData.status
              if (this.status === 'ok') {
                this.$apollo
                  .mutate({
                    mutation: resetProvinceMutation,
                    variables: { dpa: this.provinceDpa }
                  })
                  .then(({ data }) => {
                    this.status2 = data.resetProvince.status
                    if (this.status2 === 'ok') {
                      this.centralPlanMes = null
                      this.centralPlanAcumulado = null
                      this.centralRealMes = null
                      this.centralRealAcumulado = null
                      this.centralEstimadoMes = null
                      this.centralEstimadoAcumulado = null
                      this.socialPlanMes = null
                      this.socialPlanAcumulado = null
                      this.socialRealMes = null
                      this.socialRealAcumulado = null
                      this.socialEstimadoMes = null
                      this.socialEstimadoAcumulado = null
                      this.localPlanMes = null
                      this.localPlanAcumulado = null
                      this.localRealMes = null
                      this.localRealAcumulado = null
                      this.localEstimadoMes = null
                      this.localEstimadoAcumulado = null
                      const index = this.$store.getters.getIndex
                      this.$store.commit('setActualProvince', this.provinceName)
                      this.$store.commit('setSendedInfo', true)
                      this.$store.commit('deleteProvince', index)
                      this.$store.commit('updateDpa', null)
                      this.$store.commit('updateNombre', null)
                      this.$store.commit('updateChosenProvince', -1)
                      this.loading = false
                      this.$buefy.toast.open(
                        'Se envió la información del parte'
                      )
                      this.sendedInfo = true
                    }
                  })
              }
            })
        }
      })
    }
  }
}
</script>
<style scoped>
hr {
  border: 0;
  clear: both;
  display: block;
  width: 98%;
  background-color: #ced2e1;
  height: 1px;
  margin-top: -20px;
}

.fade-enter-active,
.fade-leave-active {
  /*transition: opacity 1s;*/
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  /*opacity: 0;*/
}
#inspire {
  padding: 50px;
}
</style>
