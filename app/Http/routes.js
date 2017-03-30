'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.group('dashboard', () => {
  Route.get('/', 'DashboardController.index')
}).prefix('/').middleware('auth')

Route.get('/login', 'PageController.login')
Route.get('/register', 'PageController.register')
Route.get('/logout', 'AuthController.logout')

Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')
