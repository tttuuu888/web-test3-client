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
    <pre>{{ this.content }}</pre>
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
.title-table {
  text-align: center;
  margin: auto;
}
</style>
