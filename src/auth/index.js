
export default {

  user: {
    authenticated: false
  },

  setAuthState () {
    let jwt = localStorage.getItem('access_token')
    if (jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    let jwt = localStorage.getItem('access_token')
    if (jwt) {
      return { 'Authorization': 'Bearer ' + jwt }
    }
    else {
      return { 'Authorization': 'Unauthorized' }
    }
  },

  logout () {
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  }
}
