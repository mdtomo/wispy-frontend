<template>
<q-layout ref="layout" view="hHh LpR lFf">
  <q-toolbar slot="header">
    <q-toolbar-title>Wispy Control Panel</q-toolbar-title>
    <q-btn color="secondary" @click="logout">Logout</q-btn>
  </q-toolbar>
  <q-tabs slot="navigation">
    <q-route-tab slot="title" icon="wifi" to="/probes" replace hide="icon" label="Probes" />
    <q-route-tab slot="title" icon="account_box" to="/profile" replace hide="icon" label="Profile" />
    <q-route-tab slot="title" icon="settings" to="/admin" replace label="Admin" />
  </q-tabs>
  <router-view v-on:logout-user="logout"></router-view>
</q-layout>
</template>

<script>
export default {
  name: 'Access',
  methods: {
    logout () {
      this.$auth.logout()
      this.$router.replace('/')
    }
  }
}
</script>