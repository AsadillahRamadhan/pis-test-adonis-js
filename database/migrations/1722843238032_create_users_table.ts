import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().unique()
      table.string('name').notNullable().unique()
      table.string('username', 50).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('avatar').nullable()
      table.string('password').notNullable()
      table.enum('role', ['user', 'admin']).notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
