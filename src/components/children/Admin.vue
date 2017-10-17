<template>
  <div class="row justify-center">
    <div class="col-6">
        <h5 align="center">Admin settings for {{ account.username }}</h5>
        <q-field label="Users" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      account: { username: 'test' }
    }
  }
}
</script>

