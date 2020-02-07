<template>
  <div>

    <form v-on:submit.prevent>
      <label>Search title : </label>
      <select v-model="searchType">
        <option value="Title">Title</option>
        <option value="Author">Author</option>
      </select>
      <input placeholder="Keywords" v-model="searchKeywords">
      <button class="sumit" @click="searchClick">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'searchbar',
  components: {
  },
  props: {
    searchtype: String,
    searchkeywords: String,
  },
  computed: {
  },
  methods: {
    searchClick: function() {
      console.log("type " + this.searchType)
      console.log("keywords " + this.searchKeywords)
      let keywordsList = this.searchKeywords.split(" ")
      if(this.searchType == 'Title')
        this.$router.push({ name: 'searchtitle', params:{ keywords: keywordsList, page: 1}})
      else if(this.searchType == 'Author')
        this.$router.push({ name: 'searchauthor', params:{ keywords: keywordsList, page: 1}})
    },
  },
  data () {
    return {
      msg: 'test',
      searchType: 'Title',
      searchKeywords: '',
    }
  },
  created () {
  },
  mounted () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  margin-right: 10px
}
</style>
