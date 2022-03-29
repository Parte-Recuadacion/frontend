<template>
  <div id="">
    <div class="is-fullheight">
      <div>
        <div class="has-text-centered" style="margin-top: 100px !important;">
          <nuxt-link class="font-size-4" to="/">
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
              dropdown-position="bottom"
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
              dropdown-position="bottom"
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
              dropdown-position="bottom"
              @input="updateSelection"
            >
            </b-autocomplete>
          </b-field>
        </div>
      </div>
      <transition name="fade">
        <div v-if="month && provincia && year">
          <div class="has-text-centered margin-top-20">
            <p class="font-size-7" style="color: #0855f5">
              {{ provincia }}
            </p>
            <p class="font-size-2">{{ '(' + month + ')' }}</p>
          </div>
          <p
            v-if="provinceData.length === 0 && !loading"
            class="has-text-centered margin-top-20 font-size-4"
          >
            <font-awesome-icon
              :icon="['fas', 'exclamation']"
              class="font-size-4 is-white"
              color="#0855f5"
              style="margin-right: 10px"
            />
            No tenemos registro de este parte
          </p>
          <transition name="fade">
            <div
              v-if="provinceData.length > 0 && !loading"
              class="margin-top-30"
            >
              <!-- start presupuesto Central -->
              <div class="columns is-centered">
                <div
                  class="column is-7 margin-bottom-20 is-gapless is-paddingless"
                  style="margin-top: 12px; border: solid 1pt #ced2e1"
                >
                  <p
                    class="has-text-centered font-size-3 margin-bottom-20"
                    style="color: #0855f5"
                  >
                    Presupuesto Central
                  </p>
                  <hr />
                  <b-table v-if="provinceData" ref="table" :data="provinceData">
                    <b-table-column v-slot="props" label="Fecha que se envió">
                      {{
                        moment(props.row.enviadoA)
                          .locale('es')
                          .format('dddd, MMMM Do, hh:mm')
                      }}
                    </b-table-column>
                    <b-table-column v-slot="props" label="Plan Mes">
                      {{
                        String(
                          props.row.presupuestoCentral.centralPlanMes
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Plan Acumulado">
                      {{
                        String(
                          props.row.presupuestoCentral.centralPlanAcumulado
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Real Mes">
                      {{
                        String(
                          props.row.presupuestoCentral.centralRealMes
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Real Acumulado">
                      {{
                        String(
                          props.row.presupuestoCentral.centralRealAcumulado
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Estimado Mes">
                      {{
                        String(
                          props.row.presupuestoCentral.centralEstimadoMes
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column
                      v-slot="props"
                      label="Estimado Acumulado"
                      class="margin-bottom-10"
                    >
                      {{
                        String(
                          props.row.presupuestoCentral.centralEstimadoAcumulado
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>
                  </b-table>
                  <div
                    class="row is-flex is-gapless is-paddingless is-marginless"
                    style="padding-top: 20px; padding-left: 10px; border-top: solid #ced2e1 1pt; margin-top: 10px"
                  >
                    <div
                      class="column"
                      style="border-right: solid #ced2e1 1pt;"
                    >
                      <p class="has-text-centered padding-top-10">
                        <span class="font-weight-bold"
                          >Total Real del Mes: </span
                        >{{ totalCentralRealMes }}
                      </p>
                    </div>
                    <div class="column">
                      <p class="has-text-centered padding-top-10">
                        <span class="font-weight-bold">Total Acumulado: </span
                        >{{ totalCentralRealAcumulado }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- end presupuesto Central -->

              <!-- start seguridad Social -->
              <div class="columns is-centered">
                <div
                  class="column is-7 margin-bottom-20 is-gapless is-paddingless"
                  style="margin-top: 12px; border: solid 1pt #ced2e1"
                >
                  <p
                    class="has-text-centered font-size-3 margin-bottom-20"
                    style="color: #0855f5"
                  >
                    Presupuesto Seg. Social
                  </p>

                  <hr />
                  <b-table v-if="provinceData" ref="table" :data="provinceData">
                    <b-table-column v-slot="props" label="Fecha que se envió">
                      {{
                        moment(props.row.enviadoA)
                          .locale('es')
                          .format('dddd, MMMM Do, hh:mm')
                      }}
                    </b-table-column>
                    <b-table-column v-slot="props" label="Plan Mes">
                      {{
                        String(
                          props.row.presupuestoSeguridadSocial.socialPlanMes
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Plan Acumulado">
                      {{
                        String(
                          props.row.presupuestoSeguridadSocial
                            .socialPlanAcumulado
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Real Mes">
                      {{
                        String(
                          props.row.presupuestoSeguridadSocial.socialRealMes
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Real Acumulado">
                      {{
                        String(
                          props.row.presupuestoSeguridadSocial
                            .socialRealAcumulado
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Estimado Mes">
                      {{
                        String(
                          props.row.presupuestoSeguridadSocial.socialEstimadoMes
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Estimado Acumulado">
                      {{
                        String(
                          props.row.presupuestoSeguridadSocial
                            .socialEstimadoAcumulado
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>
                  </b-table>
                  <div
                    class="row is-flex is-gapless is-paddingless is-marginless"
                    style="padding-top: 20px; padding-left: 10px; border-top: solid #ced2e1 1pt; margin-top: 10px"
                  >
                    <div
                      class="column"
                      style="border-right: solid #ced2e1 1pt;"
                    >
                      <p class="has-text-centered padding-top-10">
                        <span class="font-weight-bold"
                          >Total Real del Mes: </span
                        >{{ totalSocialRealMes }}
                      </p>
                    </div>
                    <div class="column">
                      <p class="has-text-centered padding-top-10">
                        <span class="font-weight-bold">Total Acumulado: </span
                        >{{ totalSocialRealAcumulado }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end seguridad Social -->

              <!-- start Presupuesto local -->
              <div
                v-show="
                  provincia !== 'CENTRAL' &&
                    provincia !== 'MININT' &&
                    provincia !== 'FAR'
                "
                class="columns is-centered"
              >
                <div
                  class="column is-7 is-gapless is-paddingless"
                  style="margin-top: 12px; border: solid 1pt #ced2e1"
                >
                  <p
                    class="has-text-centered font-size-3 margin-bottom-20"
                    style="color: #0855f5"
                  >
                    Presupuesto Local
                  </p>
                  <hr />
                  <b-table v-if="provinceData" ref="table" :data="provinceData">
                    <b-table-column v-slot="props" label="Fecha que se envió">
                      {{
                        moment(props.row.enviadoA)
                          .locale('es')
                          .format('dddd, MMMM Do, h:m')
                      }}
                    </b-table-column>
                    <b-table-column v-slot="props" label="Plan Mes">
                      {{
                        String(props.row.presupuestoLocal.localPlanMes).replace(
                          /\d(?=(\d{3})+\.)/g,
                          '$&,'
                        )
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Plan Acumulado">
                      {{
                        String(
                          props.row.presupuestoLocal.localPlanAcumulado
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Real Mes">
                      {{
                        String(props.row.presupuestoLocal.localRealMes).replace(
                          /\d(?=(\d{3})+\.)/g,
                          '$&,'
                        )
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Real Acumulado">
                      {{
                        String(
                          props.row.presupuestoLocal.localRealAcumulado
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Estimado Mes">
                      {{
                        String(
                          props.row.presupuestoLocal.localEstimadoMes
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>

                    <b-table-column v-slot="props" label="Estimado Acumulado">
                      {{
                        String(
                          props.row.presupuestoLocal.localEstimadoAcumulado
                        ).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-table-column>
                  </b-table>
                  <div
                    class="row is-flex is-gapless is-paddingless is-marginless"
                    style="padding-top: 20px; padding-left: 10px; border-top: solid #ced2e1 1pt; margin-top: 10px"
                  >
                    <div
                      class="column"
                      style="border-right: solid #ced2e1 1pt;"
                    >
                      <p class="has-text-centered padding-top-10">
                        <span class="font-weight-bold"
                          >Total Real del Mes: </span
                        >{{ totalLocalRealMes }}
                      </p>
                    </div>
                    <div class="column">
                      <p class="has-text-centered padding-top-10">
                        <span class="font-weight-bold">Total Acumulado: </span
                        >{{ totalLocalRealAcumulado }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Presupuesto local -->
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import provinceDataMutation from '~/apollo/mutations/provinceData.graphql'
export default {
  data() {
    return {
      loading: false,
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
        { name: '2022', value: 0 },
        { name: '2023', value: 1 },
        { name: '2024', value: 2 },
        { name: '2025', value: 3 },
        { name: '2026', value: 4 },
        { name: '2027', value: 5 },
        { name: '2028', value: 6 },
        { name: '2030', value: 7 },
        { name: '2031', value: 8 },
        { name: '2032', value: 9 },
        { name: '2033', value: 10 }
      ],
      provincias: [
        {
          name: '*** Mostrarme todo ***',
          value: 19
        },
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
        },
        { name: 'CENTRAL', value: 16 },
        { name: 'FAR', value: 17 },
        { name: 'MININT', value: 18 }
      ],
      month: null,
      year: null,
      totalCentralRealMes: 0,
      totalSocialRealMes: 0,
      totalLocalRealMes: 0,
      totalCentralRealAcumulado: 0,
      totalSocialRealAcumulado: 0,
      totalLocalRealAcumulado: 0,
      provincia: null,
      provinceData: [],
      columnsVisible: {
        nombre: { title: 'Name', display: true },

        centralPlanMes: { title: 'Plan Mes', display: true },
        centralPlanAcumulado: { title: 'Plan Acumulado', display: true },
        centralRealMes: { title: 'Real Mes', display: true },
        centralRealAcumulado: { title: 'Real Acumulado', display: true },
        centralEstimadoMes: { title: 'Estimado Mes', display: true },
        centralEstimadoAcumulado: {
          title: 'Estimado Acumulado',
          display: true
        },
        socialPlanMes: { title: 'Plan Mes', display: true },
        socialPlanAcumulado: { title: 'Plan Acumulado', display: true },
        socialRealMes: { title: 'Real Mes', display: true },
        socialRealAcumulado: { title: 'Real Acumulado', display: true },
        socialEstimadoMes: { title: 'Estimado Mes', display: true },
        socialEstimadoAcumulado: { title: 'Estimado Acumulado', display: true },
        localPlanMes: { title: 'Plan Mes', display: true },
        localPlanAcumulado: { title: 'Plan Acumulado', display: true },
        localRealMes: { title: 'Real Mes', display: true },
        localRealAcumulado: { title: 'Real Acumulado', display: true },
        localEstimadoMes: { title: 'Estimado Mes', display: true },
        localEstimadoAcumulado: { title: 'Estimado Acumulado', display: true }
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
        this.loading = true
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
            this.totalCentralRealMes = 0
            this.totalSocialRealMes = 0
            this.totalLocalRealMes = 0
            this.totalCentralRealAcumulado = 0
            this.totalSocialRealAcumulado = 0
            this.totalLocalRealAcumulado = 0
            this.provinceData = data.provinceData.province
            this.loading = false
            for (let i = 0; i < this.provinceData.length; i++) {
              this.totalCentralRealMes += parseFloat(
                this.provinceData[i].presupuestoCentral.centralRealMes
              )
              this.totalSocialRealMes += parseFloat(
                this.provinceData[i].presupuestoSeguridadSocial.socialRealMes
              )
              this.totalLocalRealMes += parseFloat(
                this.provinceData[i].presupuestoLocal.localRealMes
              )
            }
            this.totalCentralRealAcumulado = parseFloat(
              this.provinceData[this.provinceData.length - 1].presupuestoCentral
                .centralRealAcumulado
            )
            this.totalSocialRealAcumulado = parseFloat(
              this.provinceData[this.provinceData.length - 1]
                .presupuestoSeguridadSocial.socialRealAcumulado
            )
            this.totalLocalRealAcumulado = parseFloat(
              this.provinceData[this.provinceData.length - 1].presupuestoLocal
                .localRealAcumulado
            )
            this.loading = false
          })
      }
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
  margin-top: -10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
