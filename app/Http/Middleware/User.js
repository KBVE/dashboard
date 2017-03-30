'use strict'

const View = use('View')

class User {

  * handle (request, response, next) {
    const session = yield request.session.all()
    if (Object.keys(session)) {
      View.global('currentUser', session)
    }
    yield next
  }

}

module.exports = User
