<template>
  <div>
    <span v-if="showpage">
      {{ curPageNumber }} / {{ totalPageCount }}
    </span>
    <span v-else>
      {{ curPageNumber }}
    </span>
    <button :disabled="!firstPageButtonEnable" @click="firstPageButtonClick">
      First page
    </button>
    <button :disabled="!previousButtonEnable" @click="previousPageButtonClick">
      Previous page
    </button>
    <button :disabled="!nextButtonEnable" @click="nextPageButtonClick">
      Next page
    </button>
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
    showpage: Boolean,
    searchtype: String,
    searchkeywords: Array,
  },
  computed: {
  },
  methods: {
    setButtonsEnable: function() {
      this.curPageNumber = this.currentpage;
      this.totalPageCount = this.totalpage;
      if (!this.showpage) {
        this.totalPageCount = this.curPageNumber + 1;
      }
      this.firstPageButtonEnable = this.curPageNumber != 1;
      this.previousButtonEnable  = this.curPageNumber != 1;
      this.nextButtonEnable  = this.curPageNumber != this.totalPageCount;
    },
    firstPageButtonClick: function() {
      this.$router.push({ name: 'list', params: { page: 1 }})
    },
    previousPageButtonClick: function() {
      if(this.searchkeywords == '')
        this.$router.push({ name: 'list', params: { page: (this.curPageNumber - 1) }})
      else
        this.$router.push({ name: this.searchtype,
                            params:{ keywords: this.searchkeywords,
                                     page: (this.curPageNumber - 1)}})
    },
    nextPageButtonClick: function() {
      if(this.searchkeywords == '')
        this.$router.push({ name: 'list', params: { page: (this.curPageNumber + 1) }})
      else
        this.$router.push({ name: this.searchtype,
                            params:{ keywords: this.searchkeywords,
                                     page: (this.curPageNumber + 1)}})
    },
  },
  watch: {
    currentpage: {
      immediate: true,
      handler() {
        this.curPageNumber = this.currentpage;
        this.setButtonsEnable();
      }
    },
    totalpage: {
      immediate: true,
      handler() {
        this.totalPageCount = this.totalpage;
        this.setButtonsEnable();
      }
    }
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
    /* console.log(this.curPageNumber, this.totalPageCount) */
    this.setButtonsEnable();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
