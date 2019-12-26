<template>
  <div>
    <div>
      <table class="title-table">
        <td>
          <h4>{{ this.title }}</h4>
        </td>
        <td>
        </td>
        <td>
          <div>( {{ this.authorNickname }} )</div>
        </td>
      </table>
    </div>
    <pre class="content">{{ this.content }}</pre>
    <PostOptions :isauthor="isPostAuthor" :postid="this.postid" />
  </div>
</template>

<script>
import PostOptions from '@/views/PostOptions.vue'

export default {
  name: 'post',
  components: {
    PostOptions,
  },
  props: {
    postid: Number,
    loginid: String,
  },
  computed: {
  },
  methods: {
  },
  data () {
    return {
      msg: 'test',
      title: '',
      content: '',
      authorId: '',
      authorNickname: '',
      isPostAuthor: false,
    }
  },
  created () {
  },
  mounted () {
    this.$http.get('/post', {params: {postid: this.postid}})
        .then( (result) => {
          console.log("result : " + JSON.stringify(result.data))
          let ret = result.data;
          this.title = ret.title
          this.content = ret.content;
          this.authorId = ret.author;
          this.authorNickname = ret.nickname;
          this.isPostAuthor = this.loginid == this.authorId;
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-table {
  text-align: center;
  margin: auto;
}

.content {
  white-space: pre-wrap;
}
</style>
