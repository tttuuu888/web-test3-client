<template>
  <div id="app">
    <h1>Web test3</h1>
    <LoginForm v-on:loginUpdate="userLogin" v-if="!loggedIn" :key="loggedIn" />
    <div v-else>
      <div class="Sameline">Hello, {{ loginNickname }}</div>
      <button class="Sameline" @click="userLogout">Logout</button>
    </div>
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
    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log(" session store: logged in? " + user )
    if(user) {
      console.log(" session store: id ? " + user.id )
      this.loginId = user.id;
      this.loginNickname = user.nickname;
      this.loggedIn = true;
    }
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
      let user = {'id': id, 'nickname': nickname};
      sessionStorage.setItem('user', JSON.stringify(user));
      this.loggedIn = true;
      this.loginId = id;
      this.loginNickname = nickname;
      console.log("home func loging id, nickname : " + this.loginId, this.loginNickname)
      /* this.$forceUpdate(); */
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

            sessionStorage.removeItem('user');
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
.Sameline {
  display: inline-block;
  padding:1px;
  margin:12px;
}
</style>
