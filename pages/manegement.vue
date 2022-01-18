<template>
  <v-app id="inspire">
    <div class="margin-bottom-50 is-fullheight">
      <div class="margin-top-30">
        <div class="has-text-centered">
          <nuxt-link class="font-size-3" to="/">
            Volver a la página principal
          </nuxt-link>
        </div>
        <br />
        <p class="has-text-centered font-size-5">
          Seleccione la provincia el mes y el año para ver su Parte de
          Recaudación
        </p>
      </div>
      <div class="columns is-centered">
        <div class="column is-2 margin-top-20">
          <b-field>
            <b-autocomplete
              v-model="provincia"
              open-on-focus
              readonly
              :data="provincias"
              placeholder="provincia"
              field="name"
              @input="updateSelection"
            >
            </b-autocomplete>
          </b-field>
        </div>
        <div class="column is-2 margin-top-20">
          <b-field>
            <b-autocomplete
              v-model="month"
              open-on-focus
              readonly
              :data="months"
              placeholder="mes"
              field="name"
              @input="updateSelection"
            >
            </b-autocomplete>
          </b-field>
        </div>
        <div class="column is-2 margin-top-20">
          <b-field>
            <b-autocomplete
              v-model="year"
              open-on-focus
              readonly
              :data="years"
              placeholder="año"
              field="name"
              @input="updateSelection"
            >
            </b-autocomplete>
          </b-field>
        </div>
      </div>
      <div v-show="month && provincia && year">
        <div class="has-text-centered margin-top-20">
          <p class="font-size-7" style="color: #0855f5">
            {{ provincia }}
          </p>
          <p class="font-size-2">{{ '(' + month + ')' }}</p>
        </div>
        <div class="margin-top-30">
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
              <b-table
                v-if="provinceData"
                ref="table"
                :data="provinceData"
                hoverable
              >
                <b-table-column v-slot="props" label="Fecha que se envió">
                  {{
                    moment(props.row.enviadoA)
                      .locale('es')
                      .format('dddd, MMMM Do')
                  }}
                </b-table-column>
                <b-table-column v-slot="props" label="Real Mes">
                  {{
                    props.row.presupuestoGlobal.pgRealMes.replace(
                      /\d(?=(\d{3})+\.)/g,
                      '$&,'
                    )
                  }}
                </b-table-column>

                <b-table-column v-slot="props" label="Real Acomulado">
                  {{
                    props.row.presupuestoGlobal.pgRealAcomulado.replace(
                      /\d(?=(\d{3})+\.)/g,
                      '$&,'
                    )
                  }}
                </b-table-column>
                <b-table-column v-slot="props" label="Estimado del Mes">
                  {{
                    props.row.presupuestoGlobal.pgEstimadoMes.replace(
                      /\d(?=(\d{3})+\.)/g,
                      '$&,'
                    )
                  }}
                </b-table-column>
                <b-table-column v-slot="props" label="Estimado Cierre Año">
                  {{
                    props.row.presupuestoGlobal.pgEstimadoCierreAnno.replace(
                      /\d(?=(\d{3})+\.)/g,
                      '$&,'
                    )
                  }}
                </b-table-column>
              </b-table>
              <b>Total Real del Mes:</b>
              {{ String(totalpgRealMes).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}
              <br />
              <b>Total Real Acomulado:</b>
              {{
                String(totalpgRealAcomulado).replace(/\d(?=(\d{3})+\.)/g, '$&,')
              }}
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
              <b-table
                v-if="provinceData"
                ref="table"
                :data="provinceData"
                hoverable
              >
                <b-table-column v-slot="props" label="Real Mes">
                  {{
                    props.row.presupuestoCentral.pcRealMes.replace(
                      /\d(?=(\d{3})+\.)/g,
                      '$&,'
                    )
                  }}
                </b-table-column>
                <b-table-column v-slot="props" label="Real Acomulado">
                  {{
                    props.row.presupuestoCentral.pcRealAcomulado.replace(
                      /\d(?=(\d{3})+\.)/g,
                      '$&,'
                    )
                  }}
                </b-table-column>
                <b-table-column v-slot="props" label="Estimado del Mes">
                  {{
                    props.row.presupuestoCentral.pcEstimadoMes.replace(
                      /\d(?=(\d{3})+\.)/g,
                      '$&,'
                    )
                  }}
                </b-table-column>
                <b-table-column v-slot="props" label="Estimado Cierre Año">
                  {{
                    props.row.presupuestoCentral.pcEstimadoCierreAnno.replace(
                      /\d(?=(\d{3})+\.)/g,
                      '$&,'
                    )
                  }}
                </b-table-column>
              </b-table>
              <b>Total Real del Mes:</b>
              {{ String(totalpcRealMes).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}
              <br />
              <b>Total Real Acomulado:</b>
              {{
                String(totalpcRealAcomulado).replace(/\d(?=(\d{3})+\.)/g, '$&,')
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import moment from 'moment'
import provinceDataMutation from '~/apollo/mutations/provinceData.graphql'
export default {
  data() {
    return {
      moment,
      months: [
        { name: 'Enero', value: 0 },
        { name: 'Febrero', value: 1 },
        { name: 'Marzo', value: 2 },
        { name: 'Abril', value: 3 },
        { name: 'Mayo', value: 4 },
        { name: 'Junio', value: 5 },
        { name: 'Julio', value: 6 },
        { name: 'Agosto', value: 7 },
        { name: 'Septiembre', value: 8 },
        { name: 'Octubre', value: 9 },
        { name: 'Noviembre', value: 10 },
        { name: 'Diciembre', value: 11 }
      ],
      years: [
        { name: '2021', value: 0 },
        { name: '2022', value: 1 },
        { name: '2023', value: 2 },
        { name: '2024', value: 3 },
        { name: '2025', value: 4 },
        { name: '2026', value: 5 },
        { name: '2027', value: 6 },
        { name: '2028', value: 7 },
        { name: '2030', value: 8 },
        { name: '2031', value: 9 },
        { name: '2032', value: 10 },
        { name: '2033', value: 11 }
      ],
      provincias: [
        {
          name: 'Pinar del Río',
          value: 0
        },
        { name: 'Artemisa', value: 1 },
        { name: 'La Habana', value: 2 },
        { name: 'Mayabeque', value: 3 },
        { name: 'Matanzas', value: 4 },
        { name: 'Villa Clara', value: 5 },
        { name: 'Cienfuegos', value: 6 },
        { name: 'Santic Spiritus', value: 7 },
        { name: 'Ciego de Ávila', value: 8 },
        { name: 'Camagüey', value: 9 },
        { name: 'Las Tunas', value: 10 },
        { name: 'Holguín', value: 11 },
        { name: 'Granma', value: 12 },
        { name: 'Santiago de Cuba', value: 13 },
        { name: 'Guantánamo', value: 14 },
        {
          name: 'Isla de la Juventud',
          value: 15
        }
      ],
      month: null,
      totalpcRealMes: 0,
      totalpgRealMes: 0,
      totalpgRealAcomulado: 0,
      totalpcRealAcomulado: 0,
      year: null,
      provincia: null,
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
    }
  },
  methods: {
    updateSelection() {
      if (
        this.provincia !== null &&
        this.month !== null &&
        this.year !== null
      ) {
        this.$apollo
          .mutate({
            mutation: provinceDataMutation,
            variables: {
              provincia: this.provincia,
              anno: this.year,
              mes: this.month
            }
          })
          .then(({ data }) => {
            this.totalpcRealMes = 0
            this.totalpgRealMes = 0
            this.totalpgRealAcomulado = 0
            this.totalpcRealAcomulado = 0
            this.provinceData = data.provinceData.province
            for (let i = 0; i < this.provinceData.length; i++) {
              this.totalpgRealMes += parseFloat(
                this.provinceData[i].presupuestoGlobal.pgRealMes
              )
              this.totalpcRealMes += parseFloat(
                this.provinceData[i].presupuestoCentral.pcRealMes
              )
            }
            this.totalpgRealAcomulado = parseFloat(
              this.provinceData[this.provinceData.length - 1].presupuestoGlobal
                .pgRealAcomulado
            ).toFixed(1)
            this.totalpcRealAcomulado = parseFloat(
              this.provinceData[this.provinceData.length - 1].presupuestoCentral
                .pcRealAcomulado
            ).toFixed(1)
            this.totalpgRealMes = this.totalpgRealMes.toFixed(1)
            this.totalpcRealMes = this.totalpcRealMes.toFixed(1)
          })
      }
    }
  }
}
</script>
<style></style>
