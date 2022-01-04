<template>
  <b-table
    ref="table"
    :data="data"
    :loading="loading"
    :paginated="true"
    :per-page="16"
    :narrowed="true"
  >
    <template v-for="(column, pos) in columns">
      <b-table-column
        :key="pos"
        v-bind="column"
        :label="column.label"
        :visible="column.visible"
      >
        <template
          v-if="column.searchable && !column.numeric"
          slot="searchable"
          slot-scope="props"
        >
          <b-input
            v-model="props.filters[props.column.field]"
            placeholder="Buscar..."
            icon="magnify"
            size="is-small"
          />
        </template>
        <template #default="props">
          {{ props.row[column.field] }}
        </template>
      </b-table-column>
    </template>
  </b-table>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    columns: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: null
    }
  }
}
</script>
<style lang="stylus" scoped>
.changeColorR:not([disabled]):hover
  background #d60000 !important
  transition background 300ms
</style>
