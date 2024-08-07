/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ProjectsController from '#controllers/projects_controller'
import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])

  router.group(() => {
    router.group(() => {
      router.get('/', [ProjectsController, 'index']).as('project.index')
      router.post('/', [ProjectsController, 'store']).as('project.store')
      router.get('/:id', [ProjectsController, 'show']).as('project.show')
      router.put('/:id', [ProjectsController, 'update']).as('project.update')
      router.delete('/:id', [ProjectsController, 'delete']).as('project.delete')
    }).prefix('project')

    router.group(() => {
      router.get('/', () => {}).as('task.index')
      router.post('/', () => {}).as('task.store')
      router.get('/:id', () => {}).as('task.show')
      router.put('/:id', () => {}).as('task.update')
      router.delete('/:id', () => {}).as('task.delete')
    }).prefix('task')

    router.group(() => {
      router.get('/', () => {}).as('user.index')
      router.post('/', () => {}).as('user.store')
      router.get('/:id', () => {}).as('user.show')
      router.put('/:id', () => {}).as('user.update')
      router.delete('/:id', () => {}).as('user.delete')
    }).prefix('user')
  })
})
.prefix('api')
