<template>
  <div id="app">
    <h1>Web test3</h1>
    <div>
      <UserMenu v-if="loggedIn" :key="loggedIn"
                v-on:userLogout="userLogout"
                v-on:writePost="writePost"
                v-on:getList="getList"
                :userid="loginId"
                :nickname="loginNickname"/>
      <LoginForm v-else
                 v-on:loginUpdate="userLogin"/>
    </div>
    <div>
      <Post v-if="showPost" :key="showPost"
            :loginid="loginId"
            :postid="postId" />
      <PostsList v-else
                 :posts="posts"
                 :currentpage="currentPage"
                 :totalpage="totalPage"
                 :key="showPostList"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/views/Post.vue'
import PostsList from '@/views/PostsList.vue'
import LoginForm from '@/views/LoginForm.vue'
import UserMenu from '@/views/UserMenu.vue'


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
      postId: 0,
      showPost: false,
      showPostList: true,
    }
  },
  watch: {
    /* '$route' (to, from) { */
    '$route' (to) {
      if(to.name == 'post') {
        /* console.log("to:" +JSON.stringify(to)); */
        /* console.log('route page :'+  JSON.stringify(this.$route.params)) */
        this.postId = Number(this.$route.params.postid);
        console.log("postid:" + this.postId);
        this.showPost = true;
        this.showPostList = false;

      } else {
        /* console.log("to:" +JSON.stringify(to)); */
        /* console.log("to:" +JSON.stringify(to) + "from :" + JSON.stringify(from)) */
        /* console.log(" param : " + JSON.stringify(this.$route.params)) */
        /* console.log('route page :'+  this.$route.params.post) */
        this.showPost = false;
        this.showPostList = true;
        this.getList();
      }
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
    PostsList,
    LoginForm,
    UserMenu,
  },
  methods: {
    getList: function() {
      if(this.$route.params.page) {
        this.currentPage = parseInt(this.$route.params.page);
      }

      this.$http.get('/list', { params: {page: this.currentPage,}})
          .then( (result) => {
            /* console.log("axios get list" + JSON.stringify(result.data)) */
            this.posts = result.data.list
            this.totalPage =  parseInt(result.data.totalPage);
            this.currentPage =  parseInt(result.data.currentPage);
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
    writePost: function() {

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
  margin-top: 0;
}
</style>
