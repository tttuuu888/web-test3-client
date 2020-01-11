<template>
  <div id="postlist">
    <table class="post-table" style="width:80%;">
      <colgroup>
        <col span="1" style="width: 10%;">
        <col span="1" style="width: 70%;">
        <col span="1" style="width: 20%;">
      </colgroup>
      <thead>
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in this.posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>
            <router-link :to="{ name: 'post', params: { postid: post.id }}">
              {{ post.title }}
            </router-link>
          </td>
          <td>{{ post.nickname }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'postlist',
  components: {
  },
  methods: {
  },
  props: {
    posts: Array,
    currentpage: Number,
    totalpage: Number,
  },
  watch: {
    currentpage: {
      immediate: true,
      handler() {
        this.curPageNumber = this.currentpage;
      }
    },
    totalpage: {
      immediate: true,
      handler() {
        this.totalPageCount = this.totalpage;
      }
    }
  },
  data () {
    return {
      msg: 'test',
      curPageNumber: this.currentpage,
      totalPageCount: this.totalpage,
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
.post-table {
  text-align: left;
  margin: auto;
}
</style>
