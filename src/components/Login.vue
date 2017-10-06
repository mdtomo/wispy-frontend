<template>
  <div class="login">
    <div class="row justify-center items-center">
      <div class="col-3">
    <q-card color="primary">
      <q-card-title align="center">
        Login
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-input v-model="username" float-label="Username" inverted color="blue-7"/>
        <q-input v-model="password" @click="closeAlert" type="password" float-label="Password" inverted color="blue-7"/>
        <q-card-actions align="center">
          <q-btn color="secondary" @click="login">Access</q-btn>
        </q-card-actions>
      </q-card-main>
    </q-card>
    </div>
    </div>
  </div>
</template>

<script>
import { Alert } from 'quasar'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      alertWindow: ''
    }
  },
  methods: {
    login () {
      var data = new URLSearchParams()
      data.append('username', this.username)
      data.append('password', this.password)
      this.$http.post('http://localhost:3003/login', data
      )
        .then(res => {
          const token = res['data'].access_token
          if (token) {
            localStorage.setItem('access_token', token)
          }
          this.$auth.setAuthState()
          this.$router.replace('probes')
          this.username = ''
          this.password = ''
        })
        .catch(error => {
          this.alertWindow = Alert.create({duration: 3000, html: error.response.data, position: 'bottom-center', enter: 'bounceInUp', leave: 'bounceOutDown'})
          this.password = ''
        })
    },
    closeAlert () {
      if (this.alertWindow) {
        this.alertWindow.dismiss()
      }
    }
  }
}
</script>

<style>

</style>
