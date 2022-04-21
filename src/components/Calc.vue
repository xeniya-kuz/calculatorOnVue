<template>
  <div class="calc">
      <div class="logs">
      <div v-for="(log, id) in logs" :key="id">{{log}}</div>
    </div>
    <input name="operand1" data-test="operand1" type="number" placeholder="0" v-model="string1">
    <input name="operand2" type="number" placeholder="0" v-model="string2">
    = {{result}}
    <br>
    <br>
    <button v-for="item in operands" :key="item" :disabled="string1=='' || string2==''"
    @click="calcHandler(item)">
    {{item}}
    </button>
    <br>
    <br>
    <div class="error" v-show="res0">На 0 делить нельзя!</div>
    <br>
    <br>
    <br>
    <br>
    <div><label for="check"><input id="check" type="checkbox" v-model="checked">Экранная клавиатура</label></div>
    <br>
    <br>
    <div class="keyboard" v-show="checked">
      <br>
       <button v-for="(number, index) in numbers" :key="index" @click="symbolChange(number)">
       {{number}}
      </button>
      <button @click="remove">←</button>
      <button @click="clear">Очистить</button>
      <br>
      <label for="one">
      <input type="radio" id="one" value="first" v-model="picked">
      Операнд 1</label>
      <input type="radio" id="two" value="second" v-model="picked">
      <label for="two">Операнд 2</label>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Calc',
  data () {
    return {
      result: 0, // результат операции
      operand1: 0,
      operand2: 0,
      string1: '', // данные из этой строки преобразются в операнд1
      string2: '', // данные из этой строки преобразются в операнд2
      res0: false, // проверка деления на ноль
      operands: ['+', '-', '*', '/', 'xⁿ'],
      checked: true, // отображение экранной клавиатуры
      numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      picked: 'first', // выбор операнда по умолчанию
      logs: {}, // здесь хранится история операций
      test: ''
    }
  },
  methods: {
    calcHandler (operate) {
      this.operand1 = parseInt(this.string1, 10)
      this.operand2 = parseInt(this.string2, 10)
      switch (operate) {
        case '+':
          this.result = this.operand1 + this.operand2
          break
        case '-':
          this.result = this.operand1 - this.operand2
          break
        case '*':
          this.result = this.operand1 * this.operand2
          break
        case '/':
          if (this.operand2 !== 0) {
            this.result = Math.floor(this.operand1 / this.operand2)
            this.res0 = false
          } else this.res0 = true
          break
        case 'xⁿ':
          this.result = Math.pow(this.operand1, this.operand2)
          break
        default:
          this.result = 'Выберите действие из предложенных'
      }
      Vue.set(this.logs, Date.now(), `${this.operand1}${operate}${this.operand2}=${this.result}`)
    },
    isChecked () {
      this.checked = !this.checked
    },
    symbolChange (symbol) {
      switch (this.picked) {
        case 'first':
          this.string1 += symbol
          break
        case 'second':
          this.string2 = symbol + this.string2
          break
      }
    },
    remove () {
      this.result = 0
      switch (this.picked) {
        case 'first':
          this.string1 = this.string1.slice(0, this.string1.length - 1)
          break
        case 'second':
          this.string2 = this.string2.slice(0, this.string2.length - 1)
          break
      }
    },
    clear () {
      this.logs = {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.error
  color: red
</style>
