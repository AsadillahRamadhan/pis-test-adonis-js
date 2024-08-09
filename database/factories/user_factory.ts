import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { randomInt } from 'crypto';
export const UserFactory = factory
  .define(User, async ({ faker }) => {
    const roles = ['user', 'admin'];
    return {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "12345678",
      role: roles[randomInt(0, 2)]
    }
  })
  .build()