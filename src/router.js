import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/Login.vue'
import Access from '@/Access.vue'
import Probes from '@/children/Probes.vue'
import Account from '@/children/Account.vue'
import Admin from '@/children/Admin.vue'
import auth from './auth'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/access',
      name: 'Access',
      component: Access,
      beforeEnter: (to, from, next) => {
        if (!auth.user.authenticated) {
          next('/')
        }
        else {
          next()
        }
      },
      props: true,
      children: [
        {
          path: '/probes',
          component: Probes
        },
        {
          path: '/account',
          component: Account
        },
        {
          path: '/admin',
          component: Admin
        }]
    }
  ]
})
