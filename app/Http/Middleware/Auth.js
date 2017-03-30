'use strict'

class Auth {

  * handle (request, response, next) {
    const token = yield request.session.get('token')
    if (!token) {
      return response.redirect('login')
    }

    request.token = token
    yield next
  }

}

module.exports = Auth
