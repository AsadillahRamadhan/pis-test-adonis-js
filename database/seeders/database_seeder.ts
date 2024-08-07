import { ProjectFactory } from '#database/factories/project_factory'
import { TaskFactory } from '#database/factories/task_factory';
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.createMany(50);
    await ProjectFactory.createMany(150);
    await TaskFactory.createMany(450);
  }
}