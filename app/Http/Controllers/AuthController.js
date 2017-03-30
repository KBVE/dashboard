'use strict'

const got = require('got')
const forEach = require('co-foreach')
const Validator = use('Validator')

const rules = {
  username: 'required',
  password: 'required'
}

const messages = {
  required: '{{ field }} is required'
}

class AuthController {

  * login (request, response) {
    const username = request.input('username')
    const password = request.input('password')

    try {
      const apiResponse = yield got.post('http://localhost:3000/session', {
        body: {
          username,
          password
        },
        json: true
      })
      const body = apiResponse.body

      const validation = yield Validator.validate(request.except('_csrf'), rules, messages)
      if (validation.fails()) {
        const messages = validation.messages()
        yield request
          .withOut('password')
          .andWith({ errors: messages })
          .flash()
        return response.redirect('back')
      }

      if (body.ok) {
        yield request.session.put(body.data)
        return response.redirect('/')
      }
    } catch (e) {
      const body = e.response.body
      const errors = body.data.map(error => {
        error = error.replace(/"/g, '')
        if (error.includes('empty')) {
          error = error.replace('is not allowed to be empty', 'is required')
        }
        return { message: error }
      })
      yield request
        .withOut('password')
        .andWith({ errors })
        .flash()
      return response.redirect('back')
    }
  }

  * logout (request, response) {
    const sessionValues = yield request.session.all()
    const keys = Object.keys(sessionValues)

    forEach(keys, function * (value) {
      yield request.session.forget(value)
    }).then(() => response.redirect('/'))
  }

}

module.exports = AuthController
