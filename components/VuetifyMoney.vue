<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      :label="label"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :outlined="outlined"
      :dense="dense"
      :hide-details="hideDetails"
      :error="error"
      :rules="rules"
      :clearable="clearable"
      :background-color="backgroundColor"
      :prefix="options.prefix"
      :suffix="options.suffix"
      @keypress="keyPress"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  model: { prop: 'value', event: 'input' },
  props: {
    value: {
      // type: String,
      type: [String, Number],
      default: '0'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: undefined
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: [Boolean, String],
      default: false
    },
    rules: {
      type: [Array, String],
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'white'
    },
    valueWhenIsEmpty: {
      type: String,
      default: '' // "0" or "" or null
    },
    options: {
      type: Object,
      default() {
        return {
          locale: 'pt-BR',
          prefix: '',
          suffix: '',
          length: 11,
          precision: 2
        }
      }
    }
  },
  data: () => ({}),
  /*
   v-model="cmpValue": Dessa forma, ao digitar, o valor Ã© atualizado automaticamente no componente pai.
   O valor digitado entra pelo newValue do Set e Ã© emitido para o componente pai.
   the-vue-mask nao funciona corretamente ao incluir valores existentes no componente pai.
  */
  computed: {
    cmpValue: {
      get() {
        return this.value !== null && this.value !== ''
          ? this.humanFormat(this.value.toString())
          : this.valueWhenIsEmpty
      },
      set(newValue) {
        this.$emit('input', this.machineFormat(newValue))
      }
    }
  },
  methods: {
    humanFormat(number) {
      if (isNaN(number)) {
        number = ''
      } else {
        // number = Number(number).toLocaleString(this.options.locale, {maximumFractionDigits: 2, minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
        number = Number(number).toLocaleString(this.options.locale, {
          maximumFractionDigits: this.options.precision,
          minimumFractionDigits: this.options.precision
        })
      }
      return number
    },
    machineFormat(number) {
      if (number) {
        number = this.cleanNumber(number)
        // eslint-disable-next-line no-irregular-whitespace
        // Ajustar quantidade de zeros Ã  esquerda
        number = number.padStart(parseInt(this.options.precision) + 1, '0')
        // Incluir ponto na casa correta, conforme a precisÃ£o configurada
        number =
          number.substring(
            0,
            number.length - parseInt(this.options.precision)
          ) +
          '.' +
          number.substring(
            number.length - parseInt(this.options.precision),
            number.length
          )
        if (isNaN(number)) {
          number = this.valueWhenIsEmpty
        }
      } else {
        number = this.valueWhenIsEmpty
      }
      if (this.options.precision === 0) {
        number = this.cleanNumber(number)
      }
      return number
    },
    keyPress($event) {
      // console.log($event.keyCode); //keyCodes value
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault()
      }
      if (this.targetLength()) {
        $event.preventDefault()
      }
    },
    // eslint-disable-next-line no-irregular-whitespace
    // Retira todos os caracteres nÃ£o numÃ©ricos e zeros Ã  esquerda
    cleanNumber(value) {
      let result = ''
      if (value) {
        let flag = false
        const arrayValue = value.toString().split('')
        for (let i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            if (!flag) {
              // eslint-disable-next-line no-irregular-whitespace
              // Retirar zeros Ã  esquerda
              if (arrayValue[i] !== '0') {
                result = result + arrayValue[i]
                flag = true
              }
            } else {
              result = result + arrayValue[i]
            }
          }
        }
      }
      return result
    },
    isInteger(value) {
      let result = false
      if (Number.isInteger(parseInt(value))) {
        result = true
      }
      return result
    },
    targetLength() {
      if (
        Number(this.cleanNumber(this.value).length) >=
        Number(this.options.length)
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
