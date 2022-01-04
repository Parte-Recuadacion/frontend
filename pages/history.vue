<template>
  <div>
    <div class="columns is-centered">
      <div
        class="column is-6"
        style="margin-top: 12px; border: solid 1pt #ced2e1"
      >
        <p
          class="has-text-centered font-size-5 margin-bottom-20"
          style="color: #0855f5"
        >
          Presupuesto Global
        </p>
        <b-table v-if="provinceData" ref="table" :data="provinceData" hoverable>
          <b-table-column v-slot="props" label="Fecha que se envió">
            <template>
              {{
                moment(props.row.enviadoA)
                  .locale('es')
                  .format('dddd, MMMM Do')
              }}
            </template>
          </b-table-column>
          <b-table-column v-slot="props" label="Real Mes">
            <template>
              {{ props.row.presupuestoGlobal.pgRealMes }}
            </template>
          </b-table-column>
          <b-table-column v-slot="props" label="Real Acomulado">
            <template>
              {{ props.row.presupuestoGlobal.pgRealAcomulado }}
            </template>
          </b-table-column>
          <b-table-column v-slot="props" label="Estimado del Mes">
            <template>
              {{ props.row.presupuestoGlobal.pgEstimadoMes }}
            </template>
          </b-table-column>
          <b-table-column v-slot="props" label="Estimado Cierre Año">
            <template>
              {{ props.row.presupuestoGlobal.pgEstimadoCierreAnno }}
            </template>
          </b-table-column>
        </b-table>
      </div>
      <div
        class="column is-5 margin-left-10"
        style="margin-top: 12px; border: solid 1pt #ced2e1"
      >
        <p
          class="has-text-centered font-size-5 margin-bottom-20"
          style="color: #0855f5"
        >
          Presupuesto Central
        </p>
        <b-table v-if="provinceData" ref="table" :data="provinceData" hoverable>
          <b-table-column v-slot="props" label="Real Mes">
            <template>
              {{ props.row.presupuestoCentral.pcRealMes }}
            </template>
          </b-table-column>
          <b-table-column v-slot="props" label="Real Acomulado">
            <template>
              {{ props.row.presupuestoCentral.pcRealAcomulado }}
            </template>
          </b-table-column>
          <b-table-column v-slot="props" label="Estimado del Mes">
            <template>
              {{ props.row.presupuestoCentral.pcEstimadoMes }}
            </template>
          </b-table-column>
          <b-table-column v-slot="props" label="Estimado Cierre Año">
            <template>
              {{ props.row.presupuestoCentral.pcEstimadoCierreAnno }}
            </template>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import provinceDataMutation from '~/apollo/mutations/provinceData.graphql'
export default {
  data() {
    return {
      moment,
      provinceData: null,
      columnsVisible: {
        nombre: { title: 'Name', display: true },
        pgRealMes: { title: 'Real Mes', display: true },
        pgRealAcomulado: { title: 'Real Acomulado', display: true },
        pgEstimadoMes: { title: 'Estimado del Mes', display: true },
        pgEstimadoCierreAnno: { title: 'Estimado Cierre Año', display: true },
        pcRealMes: { title: 'Real Mes', display: true },
        pcRealAcomulado: { title: 'Real Acomulado', display: true },
        pcEstimadoMes: { title: 'Estimado Mes', display: true },
        pcEstimadoCierreAnno: { title: 'Estimado Año', display: true }
      }
      // showDetailIcon: true
    }
  },
  beforeMount() {
    this.$apollo
      .mutate({
        mutation: provinceDataMutation,
        variables: { anno: '2021', mes: 'asd' }
      })
      .then(({ data }) => {
        this.provinceData = data.provinceData.province
        console.log(this.provinceData)
      })
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row)
    }
  }
}
</script>
