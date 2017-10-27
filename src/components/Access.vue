<template>
<q-layout ref="layout" view="hHh LpR lFf">
  <q-toolbar slot="header">
    <q-toolbar-title>Wispy Control Panel</q-toolbar-title>
    <q-btn color="secondary" @click="logout">Logout</q-btn>
  </q-toolbar>
  <q-tabs slot="navigation">
    <q-route-tab slot="title" icon="wifi" to="/probes" replace hide="icon" label="Probes" />
    <q-route-tab slot="title" icon="account_box" to="/account" replace hide="icon" label="Account" />
    <q-route-tab slot="title" icon="settings" to="/admin" replace label="Admin" />
  </q-tabs>
  <router-view v-on:logout-user="logout"></router-view>
</q-layout>
</template>

<script>
// import Socket from 'socket.io-client'

export default {
  name: 'Access',
  mounted () {
    this.$nextTick(function () {
      this.createSocket()
    })
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.$socket.close()
      this.$router.replace('/')
    },
    createSocket () {
      // this.$socket = Socket('http://localhost:3003')
      this.$socket.open()
      console.log('From createSocket(): ', this.$socket)
      this.$socket.on('connect', () => {
        this.$socket.emit('authorization', { data: { user: 'matt', token: 'let me in' } })
        console.log('Connected with id: ', this.$socket.id ? this.$socket.id : 'No id')
        this.$socket.on('wispysvr', (data) => {
          console.log('wispysvr: ', data)
        })
      })
    }
  }
}
</script>