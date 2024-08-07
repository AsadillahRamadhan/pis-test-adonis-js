import factory from '@adonisjs/lucid/factories'
import Project from '#models/project'
import { randomInt } from 'crypto'
import { DateTime } from 'luxon'

export const ProjectFactory = factory
  .define(Project, async ({ faker }) => {
    return {
      name: faker.word.words(randomInt(1, 3)),
      start_date: DateTime.fromJSDate(faker.date.anytime()),
      end_date: DateTime.fromJSDate(faker.date.anytime())
    }
  })
  .build()