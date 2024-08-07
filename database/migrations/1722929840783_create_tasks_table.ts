import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique()
      table.uuid('user_id')
      table.uuid('project_id')
      table.string('name')
      table.dateTime('start_date')
      table.dateTime('end_date')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.foreign('user_id').references('id').inTable('users')
      table.foreign('project_id').references('id').inTable('projects')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}