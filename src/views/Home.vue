<template>
  <div id="app">
    <h1>Web test3</h1>
    <LoginForm v-on:loginUpdate="userLogin" v-if="loggedIn === false" :key="loggedIn" />
    <div v-else>
      <div>You are logged in</div>
      <button @click="userLogout">Logout</button>
    </div>
    <!-- <input type="search" class="form-control" placeholder="ID" v-model="userId">
         <input type="password" class="form-control" placeholder="PW" v-model="userPw">
         <button class="btn btn-success" v-on:click="loginUser">Login</button> -->
    <Post :posts="posts" :key="currentPage"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/views/Post.vue'
import LoginForm from '@/views/LoginForm.vue'


export default {
  name: 'app',
  data () {
    return {
      loggedIn: false,
      loginId: '',
      loginNickname: '',
      totalPage: 1,
      currentPage: 1,
      posts: [],
    }
  },
  watch: {
    /* '$route' (to, from) { */
    '$route' () {
      console.log('route page :'+  this.$route.params.page)
      this.getList();
    }
  },
  mounted () {
    this.getList();
  },
  components: {
    Post,
    LoginForm,
  },
  methods: {
    getList: function() {
      if(this.$route.params.page) {
        this.currentPage = parseInt(this.$route.params.page);
      }

      this.$http.get('/list', { params: {page: this.currentPage,}})
          .then( (result) => {
            console.log("axios get list")
            console.log(result)
            this.posts = result.data.list
            this.totalPage =  result.data.totalPage;
            this.currentPage =  result.data.currentPage;
          });
    },
    userLogin: function(id, nickname) {
      this.loggedIn = true;
      this.loginId = id;
      this.loginNickname = nickname;
      console.log("home func loging id, nickname : " + this.loginId, this.loginNickname)
      this.$forceUpdate();
    },
    userLogout: function() {
      this.$http.post('/user/logout', {
        auth: {
          id: this.loginId,
        },
      })
          .then( (result) => {
            console.log("axios get list : " + result.data.user)
            this.loggedIn = false;
            this.loginId = '';
            this.loginNickname = '';
          });
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.post-btn:hover {
  background-color:lightgray;
}
</style>
