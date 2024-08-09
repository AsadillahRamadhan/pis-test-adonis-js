/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


import router from '@adonisjs/core/services/router'
const ProjectsController = async () => await import('#controllers/projects_controller')
const TasksController = async () => await import('#controllers/tasks_controller')
const UsersController = async () => await import('#controllers/users_controller')
const AuthController = async () => await import('#controllers/auth_controller')

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
      router.get('/', [TasksController, 'index']).as('task.index')
      router.post('/', [TasksController, 'store']).as('task.store')
      router.get('/:id', [TasksController, 'show']).as('task.show')
      router.put('/:id', [TasksController, 'update']).as('task.update')
      router.delete('/:id', [TasksController, 'delete']).as('task.delete')
    }).prefix('task')

    router.group(() => {
      router.get('/', [UsersController, 'index']).as('user.index')
      router.post('/', [UsersController, 'store']).as('user.store')
      router.get('/:id', [UsersController, 'show']).as('user.show')
      router.put('/:id', [UsersController, 'update']).as('user.update')
      router.put('/:id/avatar', [UsersController, 'changeAvatar']).as('user.changeAvatar')
      router.put('/:id/delete-avatar', [UsersController, 'deleteAvatar']).as('user.deleteAvatar')
      router.delete('/:id', [UsersController, 'delete']).as('user.delete')
    }).prefix('user')
  })
})
.prefix('api')
