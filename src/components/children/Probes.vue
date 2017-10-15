<template>
  <div class="row items-center xs-gutter">
    <div class="col-3 col-xs-12 col-sm-5">
      <q-field label="Since" :labelWidth="2" icon="date_range" class="{ margin-left: 30px; }">
        <q-datetime v-model="selectedDate" type="datetime" format24h no-clear />
      </q-field>    
    </div>    
    <div class="col-4 col-xs-12 col-sm-5">    
      <q-field :label="probesQty" :labelWidth="2" icon="wifi" inset="icon">
        <q-slider v-model="probesQtySelected" :min="100" :max="1000" :step="2" label square snap />
      </q-field>  
    </div>
    <div class="col-1 col-xs-12 col-sm-2">
      <q-btn color="primary">Query</q-btn>
    </div>
      <q-data-table :data="probes" :config="config" :columns="columns" @selection="selectedRow">
        <template slot="col-ts" scope="cell">
          <span class="light-paragraph">{{ tsFormat(cell.data) }}</span>
        </template>
        <template slot="col-mac" scope="cell">
          <span class="token" v-if="aliases[cell.data]">{{ aliases[cell.data] }}</span>
          <span class="light-paragraph">{{ cell.data }}</span>
        </template>
        <template slot="selection" scope="selection">
            <q-input v-model="aliasInput" color="primary" max-length="15" :float-label="'Alias for ' + selectedMac" :after="[{
                icon: 'save',
                error: false,
                content: true,
                handler: saveAlias
              },
              {
                icon: 'delete',
                error: false,
                content: true,
                handler: deleteAlias
              }]" />
        </template>
      </q-data-table>
    
  </div>
</template>

<script>
export default {
  name: 'Probes',
  created () {
    this.getProbes()
  },
  data () {
    return {
      selectedDate: Date(),
      probesQtySelected: 100,
      config: {
        rowHeight: '50px',
        pagination: {
          rowsPerPage: 100,
          options: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
        },
        selection: 'single'
      },
      columns: [
        { label: 'Time',
          field: 'ts',
          type: 'number',
          filter: true,
          width: '100px',
          sort: true
        },
        { label: 'MAC',
          field: 'mac',
          type: 'string',
          filter: true,
          width: '100px',
          sort: true
        },
        { label: 'Channel',
          field: 'channel',
          type: 'number',
          filter: true,
          width: '100px',
          sort: true
        },
        { label: 'SSID',
          field: 'ssid',
          type: 'string',
          filter: true,
          width: '100px',
          sort: true
        },
        { label: 'RSSI',
          field: 'rssi',
          type: 'number',
          filter: true,
          width: '100px',
          sort: true
        }],
      probes: [],
      aliases: { 'b4:9c:df:52:3c:71': 'test', '00:00:00:00:00:00': 'test2' },
      aliasInput: '',
      selectedMac: '',
      msg: this.$auth.user.authenticated ? 'Logged in.' : 'Logged out.'
    }
  },
  computed: {
    probesQty: function () {
      return 'Probes ' + this.probesQtySelected
    }
  },
  methods: {
    getProbes () {
      this.$http.get('http://localhost:3003/probes', {
        headers: this.$auth.getAuthHeader()
      })
        .then(res => {
          this.probes = res.data
        })
        .catch(error => {
          if (error.response.status === 401 || error.response.status === 422) {
            console.log(error.response['data'].msg)
            this.$emit('logout-user')
          }
        })
    },
    tsFormat (ts) {
      return this.$moment(parseInt(ts.slice(0, 13))).format('MM/DD/YY, HH:mm:ss:') + ts.slice(10, 16).toString()
    },
    saveAlias () {
      if (this.aliasInput.length > 0) {
        this.aliases[this.selectedMac] = this.aliasInput
      }
    },
    deleteAlias () {
      console.log('Delete alias')
    },
    selectedRow (rows, selection) {
      if (rows > 0) {
        this.selectedMac = selection[0].data.mac
        if (this.aliases[selection[0].data.mac]) {
          this.aliasInput = this.aliases[selection[0].data.mac]
        }
        else {
          this.aliasInput = ''
        }
      }
    }
  }
}
</script>
<style scoped>
.tofront { z-index: -1; } 
</style>
