import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthenticateMiddleware {
  async handle({auth, response}: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    try {
      await auth.authenticate();
      return await next();
    } catch (e){
      return response.unauthorized({message: "You are not authorized!"});
    }
  }
}