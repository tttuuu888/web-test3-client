<template>
  <div>
    <div class="Sameline">Hello, {{ nickname }}</div>
    <button class="Sameline" @click="$emit('userLogout')">Logout</button>
    <button class="Sameline" @click="writePostClick">Write Post</button>
    <WritePost v-if="writePostVisible"
               v-on:closeModal="closeModal"
               v-on:submitPost="submitPost"
               :userid="userid" />
  </div>
</template>

<script>
import WritePost from '@/views/WritePost.vue'

export default {
  name: 'usermenu',
  components: {
    WritePost,
  },
  props: {
    userid: String,
    nickname: String,
  },
  computed: {
  },
  methods: {
    writePostClick: function() {
      this.writePostVisible = true;
    },
    closeModal: function() {
      this.writePostVisible = false;
    },
    submitPost: function(postid) {
      this.writePostVisible = false;
      console.log("now open the post, " + postid);
      this.$emit('getList');
    },
  },
  data () {
    return {
      msg: 'test',
      writePostVisible: false,
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
.Sameline {
  display: inline-block;
  padding:1px;
  margin:12px;
}
</style>
