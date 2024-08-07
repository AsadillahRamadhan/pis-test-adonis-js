import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto';
import Task from './task.js';
import * as relations from '@adonisjs/lucid/types/relations';

export default class Project extends BaseModel {
  @beforeCreate()
  static assignUuid(project: Project){
    project.id = randomUUID();
  }
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column.dateTime()
  declare start_date: DateTime

  @column.dateTime()
  declare end_date: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Task, {foreignKey: 'project_id'})
  declare tasks: relations.HasMany<typeof Task>
}