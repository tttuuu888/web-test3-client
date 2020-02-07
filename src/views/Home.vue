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
    <SearchBar v-if="!showPost"/>
    <Pagination :currentpage="currentPage"
                :totalpage="totalPage"
                :showpage="showPage"
                :searchtype="pageType"
                :searchkeywords="searchKeywords"/>
  </div>
</template>

<script>
import qs from 'qs';
// @ is an alias to /src
import Post from '@/views/Post.vue'
import PostsList from '@/views/PostsList.vue'
import LoginForm from '@/views/LoginForm.vue'
import UserMenu from '@/views/UserMenu.vue'
import SearchBar from '@/views/SearchBar.vue'
import Pagination from '@/views/Pagination.vue'


export default {
  name: 'app',
  data () {
    return {
      loggedIn: false,
      loginId: '',
      loginNickname: '',
      totalPage: 1,
      currentPage: 1,
      pageType: 'list',
      posts: [],
      postId: 0,
      showPost: false,
      showPostList: true,
      showPage: true,
      searchType: '',
      searchKeywords: [],
    }
  },
  watch: {
    /* '$route' (to, from) { */
    '$route' (to) {
      /* console.log("to:" +JSON.stringify(to)); */
      console.log('route page :'+  JSON.stringify(this.$route.params))
      this.showPost = false;
      this.showPostList = true;
      this.showPage=true;
      this.searchKeywords  = [];
      switch (to.name) {
        case 'post':
          this.postId = Number(this.$route.params.postid);
          this.showPost = true;
          this.showPostList = false;
          break;
        case 'searchtitle':
          this.pageType='searchtitle'
          this.showPage=false
          this.getSearchResult('title', this.$route.params.keywords, this.$route.params.page);
          break;
        case 'searchauthor':
          this.pageType='searchauthor'
          this.showPage=false
          this.getSearchResult('author', this.$route.params.keywords, this.$route.params.page);
          break;
        default:
          this.getList(parseInt(this.$route.params.page));
          break;
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
    this.getList(1);
  },
  components: {
    Post,
    PostsList,
    LoginForm,
    UserMenu,
    SearchBar,
    Pagination,
  },
  methods: {
    getList: function(page) {
      this.currentPage = page;

      this.$http.get('/list', { params: {page: this.currentPage,}})
          .then( (result) => {
            /* console.log("axios get list" + JSON.stringify(result.data)) */
            this.posts = result.data.list
            this.totalPage =  parseInt(result.data.totalPage);
            this.currentPage =  parseInt(result.data.currentPage);
          });
    },
    getSearchResult: function(stype, skeywords, spage) {
      let url = '/search/' + stype
      this.searchKeywords = this.$route.params.keywords;

      let psFunc = function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      }

      this.$http.get(url,
                     { params: {keywords: skeywords, page: spage,},
                       paramsSerializer: psFunc})
          .then( (result) => {
            console.log("axios get list" + JSON.stringify(result.data))
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
