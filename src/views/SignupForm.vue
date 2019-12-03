<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('closeModal')">
        <div class="modal-container" @click.stop>

          <div class="modal-header">
            <slot name="header">
            </slot>
          </div>

          <div class="modal-body">
            <form action="">
              <p>
                <label for="id-input">ID : </label>
                <input id="id-input" type="text" value="" v-model="userId" />
              </p>
              <p>
                <label for="name-input">Name : </label>
                <input id="name-input" type="text" value="" v-model="userName" />
              </p>
              <p>
                <label for="pw-input">Password : </label>
                <input id="pw-input" type="password" value="" v-model="userPassword" />
              </p>
              <p>
                <label for="email-input">E-mail : </label>
                <input id="email-input" type="text" value="" v-model="userEmail" />
              </p>
              <p>
                <label for="nickname-input">Nickname : </label>
                <input id="nickname-input" type="text" value="" v-model="userNickname" />
              </p>
            </form>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div class="user-alert" v-if="userAlert">
                {{ alertMsg }}
              </div>
              <button class="modal-default-button" @click="registerUser">
                Submit
              </button>
              <button class="modal-default-button" @click="$emit('closeModal')">
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'signup',
  components: {
  },
  props: {
    visible: Boolean,
  },
  methods: {
    closeSignup: function() {
      console.log("close modal " + this.visible);
      this.$emit('closeModal');
    },
    registerUser: function() {
      if(this.userId == '' ||
         this.userPassword == '' ||
         this.userEmail == '' ||
         this.userEmail == '') {
        this.alertMsg = 'Fill in all fields!';
        this.userAlert = true
        return;
      }

      this.$http.get('/user/exists-p', {params: {
        id: this.userId,
        email: this.userEmail,
      }}).then( (result) => {
        console.log("result : " + JSON.stringify(result.data))
        if(result.data.status == "success") {
          this.$emit('submitSignup', {
            auth: {
              id: this.userId,
              password: this.userPassword,
              name: this.userName,
              nickname: this.userNickname,
              email: this.userEmail,
            }
          });
        } else {
          this.alertMsg = 'Same user already exists!';
          this.userAlert = true
        }
      })
    }
  },
  data () {
    return {
      msg: 'test',
      userId: '',
      userPassword: '',
      userName: '',
      userNickname: '',
      userEmail: '',
      userAlert: false,
      alertMsg: ''
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px 40px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.user-alert {
  color: #ff0000;
}

</style>
