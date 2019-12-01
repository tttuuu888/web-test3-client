<template>
  <div id="app">
    <Main msg="Web-test 3"/>
    <input type="search" class="form-control" placeholder="ID" v-model="userId">
    <input type="password" class="form-control" placeholder="PW" v-model="userPw">
    <button class="btn btn-success" v-on:click="loginUser">Login</button>
    <button class="btn btn-success" v-on:click="addUser">Sign-up</button>
    <Post :posts="posts" :key="currentPage"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main.vue'
import Post from '@/views/Post.vue'


export default {
  name: 'app',
  data () {
    return {
      userId: '',
      userPw: '',
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
    Main,
    Post
  },
  methods: {
    getList: function() {
      if(this.$route.params.page) {
        this.currentPage = parseInt(this.$route.params.page);
      }

      this.$http.get('/list', { params: {page: this.currentPage,}})
          .then( (result) => {
            console.log("axios get list")
            console.log(result.data.list)
            this.posts = result.data.list
            this.totalPage =  result.data.totalPage;
            this.currentPage =  result.data.currentPage;
          });
    },
    addUser: function() {
      let tp = this.$hostname + '/add-user'
      console.log('test to ' + tp)
      this.$http.post('/add-user',
                      {
                        auth: {
                          id: 'janedoe',
                          pw: 's00pers3cret'
                        },
                      },
      ).then( (result) => {
        console.log(result.data)
        console.log("test api1 : " + result.data)
      })
      console.log("add user,",this.userId,this.userPw, this.$hostname)
    },
    loginUser: function() {
      console.log("login user,",this.userId,this.userPw)
    }
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
