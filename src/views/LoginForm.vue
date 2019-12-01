<template>
  <div>
    <form v-on:submit.prevent>
      <input placeholder="Enter your ID" v-model="userId">
      <input placeholder="Enter your password" type="password" v-model="userPw">
      <button class="sumit" @click="loginUser">Login</button>
      <button class="sumit" @click="addUser">Sign-up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'loginform',
  components: {
  },
  methods: {
    addUser: function() {
      this.$http.post('/user/add',
                      {
                        auth: {
                          id: 'test',
                          name: 'tname',
                          nickname: 'nick name',
                          email: 'teste@mail.com',
                          password: '1234'
                        },
                      },
      ).then( (result) => {
        console.log(result.data)
        console.log("test api1 : " + result.data)
      })
    },
    loginUser: function() {
      console.log("login user,",this.userId,this.userPw)
      this.$http.post('/user/login',
                      {
                        auth: {
                          id: this.userId,
                          password: this.userPw
                        },
                      },
      ).then( (result) => {
        let loginId = result.data.user.id;
        let loginNickname = result.data.user.nickname;
        console.log("loging id, nickname : " + loginId, loginNickname)
        this.$emit('loginUpdate', loginId, loginNickname)
      })
    }
  },
  data () {
    return {
      userId: '',
      userPw: '',
    }
  },
  created () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
