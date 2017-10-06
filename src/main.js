// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, { QDataTable, QInput, QCard, QCardTitle, QCardSeparator, QCardMain, QCardActions, QLayout, QToolbar, QRouteTab, QToolbarTitle, QSideLink, QCollapsible, QList, QListHeader, QItem, QItemSide, QItemMain, QIcon, QBtn, QTabs, QDatetime } from 'quasar'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import auth from './auth'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$moment = moment
auth.setAuthState()
Vue.prototype.$auth = auth

Vue.use(Quasar, {
  components: {
    QDataTable,
    QInput,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QCardActions,
    QLayout,
    QToolbar,
    QRouteTab,
    QToolbarTitle,
    QSideLink,
    QCollapsible,
    QList,
    QListHeader,
    QBtn,
    QItem,
    QItemSide,
    QItemMain,
    QIcon,
    QTabs,
    QDatetime
  }
}) // Install Quasar Framework

if (__THEME === 'mat') {
  // require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'

/* eslint-disable no-new */
new Vue({
  el: '#q-app',
  router,
  render: h => h(require('./App'))
})