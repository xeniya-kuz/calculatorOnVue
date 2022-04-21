<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Calc msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Calc from '@/components/Calc.vue'

export default {
  name: 'Home',
  components: {
    Calc
  }
}
</script>
