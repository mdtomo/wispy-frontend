<template>
  <div class="row justify-center items-center">
    <div class="col-6">
        <h5 align="center">Account settings for {{ account.username }}</h5>
        <q-field label="Previous logins" />
        <q-field label="Previous failed logins" />
        <q-field icon='email' :labelWidth="2" label="Email">
            <q-input v-model="account.email" />
        </q-field>
        <q-field icon='lock' :labelWidth="2" label="Change password">
            <q-input v-model="account.password1" />
        </q-field>
        <q-field icon='lock' :labelWidth="2" label="Retype password">
            <q-input v-model="account.password2" />
        </q-field>
        <q-btn class="updateBtn" color="primary" @click="update">Update</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data () {
    return {
      account: { username: 'test', email: 'test@test.com', password1: '', password2: '' }
    }
  },
  methods: {
    update () {
      console.log('update')
    }
  }
}
</script>
<style scoped>
.updateBtn {
  position: relative;
  margin: 0 auto;
  display: block;
}
</style>
