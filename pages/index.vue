<template>
  <v-app id="inspire">
    <p class="has-text-right margin-top-10">
      {{
        moment()
          .locale('es')
          .format('dddd, MMMM Do YYYY')
      }}
      <br />
      <nuxt-link class="font-size-3" to="/manegement">
        ver historial del Parte
      </nuxt-link>
    </p>
    <div class="margin-top-10">
      <p
        v-show="provinceName"
        class="has-text-centered font-size-7"
        style="color: #0855f5;"
      >
        {{ provinceDpa + ' - ' + provinceName }}
      </p>
      <p
        v-show="
          !provinceName &&
            parseInt(
              moment()
                .locale('es')
                .format('D')
            ) < 6
        "
        class="has-text-centered font-size-6"
      >
        * Seleccione su provincia en la parte izquierda
      </p>
      <p
        v-show="
          !provinceName &&
            parseInt(
              moment()
                .locale('es')
                .format('D')
            ) >= 6
        "
        class="has-text-centered font-size-6"
      >
        * Espere hasta el lunes para enviar la información del Parte
      </p>
    </div>
    <div>
      <p class="has-text-centered">
        * La información del parte debe enviarse en
        <span style="color: #0855f5; font-weight: bold">miles de pesos</span>
        todos los
        <span style="color: #0855f5; font-weight: bold">lunes</span> (o martes
        en casos excepcionales) antes las
        <span style="color: #0855f5; font-weight: bold">4:00pm</span>.
      </p>
      <br />
      <p class="has-text-centered" style="margin-top: -30px">
        * Complete los presupuestos debajo y una vez que haya chequeado que todo
        esté correcto, hacer click en el botón
        <span style="color: #0855f5; font-weight: bold">Enviar información</span
        >.
      </p>
    </div>
    <div class="columns is-centered">
      <div
        class="column is-5 margin-top-20"
        style="border: solid #ced2e1 1pt; padding: 50px"
      >
        <p
          class="has-text-centered font-size-5 margin-bottom-10"
          style="color: #0855f5;"
        >
          Presupuesto Global
        </p>
        <VuetifyMoney
          v-model="pgRealMes"
          :label="label1"
          :readonly="readonly1"
          :disabled="disabled1"
          :outlined="outlined1"
          :clearable="clearable1"
          :options="options1"
        />
        <VuetifyMoney
          v-model="pgRealAcomulado"
          :label="label2"
          :readonly="readonly2"
          :disabled="disabled2"
          :outlined="outlined2"
          :clearable="clearable2"
          :options="options2"
        />
        <VuetifyMoney
          v-model="pgEstimadoMes"
          :label="label3"
          :readonly="readonly3"
          :disabled="disabled3"
          :outlined="outlined3"
          :clearable="clearable3"
          :options="options3"
        />
        <VuetifyMoney
          v-model="pgEstimadoAnno"
          :label="label4"
          :readonly="readonly4"
          :disabled="disabled4"
          :outlined="outlined4"
          :clearable="clearable4"
          :options="options4"
        />
      </div>
      <div class="column is-1"></div>
      <div
        class="column is-5 margin-top-20"
        style="border: solid #ced2e1 1pt; padding: 50px"
      >
        <p
          class="has-text-centered font-size-5 margin-bottom-10"
          style="color: #0855f5;"
        >
          Presupuesto Central
        </p>
        <VuetifyMoney
          v-model="pcRealMes"
          :label="label5"
          :readonly="readonly5"
          :disabled="disabled5"
          :outlined="outlined5"
          :clearable="clearable5"
          :options="options5"
        />
        <VuetifyMoney
          v-model="pcRealAcomulado"
          :label="label6"
          :readonly="readonly6"
          :disabled="disabled6"
          :outlined="outlined6"
          :clearable="clearable6"
          :options="options6"
        />
        <VuetifyMoney
          v-model="pcEstimadoMes"
          :label="label7"
          :readonly="readonly7"
          :disabled="disabled7"
          :outlined="outlined7"
          :clearable="clearable7"
          :options="options7"
        />
        <VuetifyMoney
          v-model="pcEstimadoAnno"
          :label="label8"
          :readonly="readonly8"
          :disabled="disabled8"
          :outlined="outlined8"
          :clearable="clearable8"
          :options="options8"
        />
      </div>
    </div>
    <div class="has-text-centered margin-top-30">
      <b-button
        class="is-primary"
        style="width: 20%"
        :disabled="
          !pgRealMes ||
            !pgRealAcomulado ||
            !pgEstimadoMes ||
            !pcRealMes ||
            !pcRealAcomulado ||
            !pcEstimadoMes ||
            !provinceName
        "
        @click="sendInfo()"
      >
        Enviar información</b-button
      >
    </div>
  </v-app>
</template>

<script>
import moment from 'moment'
import VuetifyMoney from '~/components/VuetifyMoney.vue'

import insertaDataMutation from '~/apollo/mutations/insertData.graphql'
import resetProvinceMutation from '~/apollo/mutations/resetProvince.graphql'
import resetListMutation from '~/apollo/mutations/resetList.graphql'
export default {
  components: {
    VuetifyMoney
  },
  data: () => ({
    moment,
    status: '',
    status2: '',
    pgRealMes: null,
    label1: 'Real Mes',
    readonly1: false,
    disabled1: false,
    outlined1: true,
    clearable1: true,
    options1: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    pgRealAcomulado: null,
    label2: 'Real Acomulado',
    readonly2: false,
    disabled2: false,
    outlined2: true,
    clearable2: true,
    options2: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    pgEstimadoMes: null,
    label3: 'Estimado del Mes',
    readonly3: false,
    disabled3: false,
    outlined3: true,
    clearable3: true,
    options3: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    pgEstimadoAnno: null,
    label4: 'Estimado cierre Año (opcional)',
    readonly4: false,
    disabled4: false,
    outlined4: true,
    clearable4: true,
    options4: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    pcRealMes: null,
    label5: 'Real Mes',
    readonly5: false,
    disabled5: false,
    outlined5: true,
    clearable5: true,
    options5: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    pcRealAcomulado: null,
    label6: 'Real Acomulado',
    readonly6: false,
    disabled6: false,
    outlined6: true,
    clearable6: true,
    options6: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    pcEstimadoMes: null,
    label7: 'Estimado del Mes',
    readonly7: false,
    disabled7: false,
    outlined7: true,
    clearable7: true,
    options7: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    pcEstimadoAnno: null,
    label8: 'Estimado cierre Año (opcional)',
    readonly8: false,
    disabled8: false,
    outlined8: true,
    clearable8: true,
    options8: {
      locale: 'pt-BR',
      prefix: '$',
      suffix: '',
      length: 15,
      precision: 1
    },
    status1: ''
  }),
  computed: {
    provinceName() {
      return this.$store.getters.getName
    },
    provinceDpa() {
      return this.$store.getters.getDpa
    }
  },
  beforeMount() {
    const day = moment()
      .locale('es')
      .format('D')
    if (parseInt(day) >= 6) {
      this.$apollo.mutate({ mutation: resetListMutation }).then(({ data }) => {
        this.status1 = data.resetList
      })
    }
  },
  methods: {
    sendInfo() {
      console.log(
        moment()
          .locale('es')
          .format()
      )
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
          if (this.pcEstimadoAnno === null || this.pcEstimadoAnno === '') {
            this.pcEstimadoAnno = 0
          }
          if (this.pgEstimadoAnno === null || this.pgEstimadoAnno === '') {
            this.pgEstimadoAnno = 0
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
                pgRealMes: this.pgRealMes,
                pgRealAcomulado: this.pgRealAcomulado,
                pgEstimadoMes: this.pgEstimadoMes,
                pgEstimadoCierreAnno: this.pgEstimadoAnno,
                pcRealMes: this.pcRealMes,
                pcRealAcomulado: this.pcRealAcomulado,
                pcEstimadoMes: this.pcEstimadoMes,
                pcEstimadoCierreAnno: this.pcEstimadoAnno
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
                      this.pgRealMes = null
                      this.pgRealAcomulado = null
                      this.pgEstimadoMes = null
                      this.pgEstimadoAnno = null
                      this.pcRealMes = null
                      this.pcRealAcomulado = null
                      this.pcEstimadoMes = null
                      this.pcEstimadoAnno = null
                      window.location.href = '/'
                      this.$buefy.toast.open(
                        'Se envió la información del parte'
                      )
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
