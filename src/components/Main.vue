<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Main',
  components: {
  },
  methods: {
  },
  props: {
    msg: String
  },
  data () {
    return {
      msg2: 'test'
    }
  },
  created () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
