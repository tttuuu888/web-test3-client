<template>
  <div>
    <button class="back" @click="backEvent">Back</button>
    <button class="home" @click="homeEvent">Home</button>
    <button v-if="isauthor" class="edit" @click="editPost">Edit</button>
    <button v-if="isauthor" class="delete" @click="deletePost">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'postoptions',
  components: {
  },
  props: {
    postid: Number,
    isauthor: Boolean,
  },
  computed: {
  },
  methods: {
    backEvent: function() {
      window.history.back();
    },
    homeEvent: function() {
      this.$router.push('/list/1')
    },
    editPost: function() {

    },
    deletePost: function() {
      var confirmed = confirm('Are you sure to delete this post?');
      if (!confirmed) {
        return;
      }

      this.$http.get('/post/delete', {params: {postid: this.postid}})
          .then( (result) => {
            console.log("Delete result : " + JSON.stringify(result.data))
          });

      alert("Delete Post!!")
      this.homeEvent();
    },
  },
  data () {
    return {
      msg: 'test',
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

</style>
