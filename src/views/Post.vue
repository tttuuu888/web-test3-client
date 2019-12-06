<template>
  <div>
    <div>title : {{ this.title }}</div>
    <div>Author : {{ this.authorNickname }}</div>
    <div>Content : <pre>{{ this.content }}</pre></div>
  </div>
</template>

<script>
export default {
  name: 'post',
  components: {
  },
  props: {
    postid: Number,
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
      authorNickname: '',
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
          this.authorNickname = ret.nickname;
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
