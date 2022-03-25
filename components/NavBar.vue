<template>
  <b-navbar type="is-primary" style="position: fixed; width: 100%; top: 0;">
    <template #brand>
      <b-navbar-item
        class="margin-left-30"
        tag="router-link"
        :to="{ path: '/' }"
      >
        <b-icon icon="home" size="is-medium">Inicio</b-icon>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-dropdown
        class="margin-right-30 font-size-4"
        label="Administracion"
      >
        <b-navbar-item
          v-show="$route.name !== 'index'"
          tag="router-link"
          :to="{ path: '/' }"
        >
          <p class="font-size-1">Inicio</p>
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/management' }">
          <p class="font-size-1">ver historial del Parte</p>
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
export default {}
</script>

<style scoped></style>
