import factory from '@adonisjs/lucid/factories'
import Task from '#models/task'
import User from '#models/user'
import Project from '#models/project';
import { randomInt } from 'crypto';

export const TaskFactory = factory
  .define(Task, async ({ faker }) => {

    const userIds = await User.query().select('id')
    const randomUserId = faker.helpers.arrayElement(userIds.map(user => user.id))
    
    const projectIds = await Project.query().select('id')
    const randomProjectId = faker.helpers.arrayElement(projectIds.map(project => project.id))
    return {
      user_id: randomUserId,
      project_id: randomProjectId,
      name: faker.word.words(randomInt(1, 3))
    }
  })
  .build()