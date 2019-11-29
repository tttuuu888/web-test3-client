<template>
  <div id="app">
    <Main msg="Web-test 3"/>
    <input type="search" class="form-control" placeholder="ID" v-model="userId">
    <input type="password" class="form-control" placeholder="PW" v-model="userPw">
    <button class="btn btn-success" v-on:click="loginUser">Login</button>
    <button class="btn btn-success" v-on:click="addUser">Sign-up</button>
    <ul id="postList">
      <li v-for="post in posts" :key="post.id">
        <ul class="post-btn" @click="selectPost(post.id)">{{ post.id }} {{ post.title }}</ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'app',
  data () {
    return {
      userId: '',
      userPw: '',
      posts: [''],
    }
  },
  mounted () {
    console.log('test component mounted.')
    this.$http.get('/list').then( (result) => {
      console.log(result.data.list)
      this.posts = result.data.list
    });
  },
  components: {
    Main
  },
  methods: {
    selectPost: function(id) {
      console.log('You chose a post id ' + id)
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
