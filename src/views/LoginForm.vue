<template>
  <div>
    <form v-on:submit.prevent>
      <input placeholder="Enter your ID" v-model="userId">
      <input placeholder="Enter your password" type="password" v-model="userPw">
      <button class="sumit" @click="loginClick">Login</button>
      <button class="sumit" @click="signupClick">Sign-up</button>
    </form>
    <SignupForm v-if="signupVisible" v-on:closeModal="closeModal" v-on:submitSignup="submitSignup"/>
  </div>
</template>

<script>
import SignupForm from '@/views/SignupForm.vue'

export default {
  name: 'loginform',
  components: {
    SignupForm
  },
  methods: {
    login: function(id, pw) {
      console.log("login user,",id, pw)
      this.$http.post('/user/login',
                      {
                        auth: {
                          id: id,
                          password: pw
                        },
                      },
      ).then( (result) => {
        let loginId = result.data.user.id;
        let loginNickname = result.data.user.nickname;
        console.log("loging id, nickname : " + loginId, loginNickname)
        this.$emit('loginUpdate', loginId, loginNickname)
      })
    },
    signupClick: function() {
      this.signupVisible = true;
    },
    loginClick: function() {
      this.login(this.userId,this.userPw);
    },
    closeModal: function() {
      this.signupVisible = false;
    },
    submitSignup: function(user) {
      console.log("user : " + user)
      this.signupVisible = false;
    }
  },
  data () {
    return {
      userId: '',
      userPw: '',
      signupVisible: false,
    }
  },
  created () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
