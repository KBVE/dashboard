'use strict'

class DashboardController {

  * index (request, response) {
    yield response.sendView('dashboard/index')
  }

}

module.exports = DashboardController
