import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto';
import User from './user.js';
import * as relations from '@adonisjs/lucid/types/relations';
import Project from './project.js';

export default class Task extends BaseModel {
  @beforeCreate()
  static assignUuid(task: Task){
    task.id = randomUUID();
  }
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare user_id: string

  @column()
  declare project_id: string

  @column.dateTime()
  declare start_date: DateTime

  @column.dateTime()
  declare end_date: DateTime
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {foreignKey: 'user_id', localKey: 'id'})
  declare user: relations.BelongsTo<typeof User>

  @belongsTo(() => Project, {foreignKey: 'project_id', localKey: 'id'})
  declare project: relations.BelongsTo<typeof Project>
}