<template>
    <q-data-table :data="probes" :config="config" :columns="columns">
      <template slot="col-ts" scope="cell">
        <span class="light-paragraph">{{ tsFormat(cell.data) }}</span>
      </template>
    </q-data-table>
</template>

<script>
export default {
  name: 'Probes',
  created () {
    this.getProbes()
  },
  data () {
    return {
      config: {rowHeight: '50px', columnPicker: true},
      columns: [
        { label: 'Time',
          field: 'ts',
          type: 'number',
          filter: true,
          width: '100px'
        },
        { label: 'MAC',
          field: 'mac',
          type: 'string',
          filter: true,
          width: '100px'
        },
        { label: 'Channel',
          field: 'channel',
          type: 'string',
          filter: true,
          width: '100px'
        },
        { label: 'SSID',
          field: 'ssid',
          type: 'string',
          filter: true,
          width: '100px'
        },
        { label: 'RSSI',
          field: 'rssi',
          type: 'string',
          filter: true,
          width: '100px'
        }],
      loading: true,
      probes: [],
      msg: this.$auth.user.authenticated ? 'Logged in.' : 'Logged out.'
    }
  },
  methods: {
    getProbes () {
      this.$http.get('http://localhost:3003/probes', {
        headers: this.$auth.getAuthHeader()
      })
        .then(res => {
          this.loading = false
          this.probes = res.data
        })
        .catch(error => {
          console.log(error.response['data'].msg)
          if (error.response['data'].msg === 'Token has expired') {
            // this.logout()
            this.$emit('logout-user')
          }
        })
    },
    tsFormat (ts) {
      return this.$moment(parseInt(ts.slice(0, 13))).format('MM/DD/YY, HH:mm:ss:') + ts.slice(10, 16).toString()
    }
  }
}
</script>

