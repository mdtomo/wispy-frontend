
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
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  },

  logout () {
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  }
}
