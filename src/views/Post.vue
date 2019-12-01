<template>
  <div id="post">
    <ul id="postList">
      <li class="post-btn" v-for="post in this.posts" :key="post.id">
        <router-link :to="{ name: 'list', params: { page: post.id }}">
          {{ post.id }} {{ post.title }} {{ post.nickname }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'post',
  components: {
  },
  methods: {
  },
  props: {
    page: Number,
  },
  data () {
    return {
      msg: 'test',
      posts: [],
      curPage: this.page
    }
  },
  created () {
    console.log("created page : " + this.curPage)
  },
  mounted () {
    console.log("page : " + this.curPage)
    this.$http.get('/list', { params: {
      page: this.curPage,}
    }).then( (result) => {
      console.log(result.data.list)
      this.posts = result.data.list
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
