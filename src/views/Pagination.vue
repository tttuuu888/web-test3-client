<template>
  <div>
    <button :disabled="!firstPageButtonEnable">First page</button>
    <button :disabled="!previousButtonEnable">Previous page</button>
    <button :disabled="!nextButtonEnable">Next page</button>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  components: {
  },
  props: {
    currentpage: Number,
    totalpage: Number,
  },
  computed: {
  },
  methods: {
  },
  data () {
    return {
      msg: 'test',
      curPageNumber: this.currentpage,
      totalPageCount: this.totalpage,
      firstPageButtonEnable: true,
      previousButtonEnable: true,
      nextButtonEnable: true,
    }
  },
  created () {
  },
  mounted () {
    console.log("mounted")
    console.log(this.curPageNumber, this.totalPageCount)
    this.firstPageButtonEnable = this.curPageNumber != 1;
    this.previousButtonEnable  = this.curPageNumber != 1;
    this.nextButtonEnable  = this.curPageNumber != this.totalPageCount;

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
