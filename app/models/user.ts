import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { randomUUID } from 'crypto'
import Task from './task.js'
import * as relations from '@adonisjs/lucid/types/relations'
import logger from '@adonisjs/core/services/logger'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @beforeCreate()
  static assignUuid(user: User){
    user.id = randomUUID();
  }
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare avatar: string | null

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasMany(() => Task, {foreignKey: 'user_id'})
  declare tasks: relations.HasMany<typeof Task>



  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      try {
        user.password = await hash.make(user.password)
      }
      catch (error) {
        logger.error(error)
      }
    }
  }

  static accessTokens = DbAccessTokensProvider.forModel(User)
}