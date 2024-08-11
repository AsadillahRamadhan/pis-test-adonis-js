import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle({auth, response}: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    try {
      await auth.authenticate();
      if(auth.user!.$attributes.role != 'admin'){
        return response.unauthorized({message: "You are not an admin!"});
      }
      return await next();
    } catch (e){
      return response.unauthorized({message: "You are not authorized!"});
    }

    /**
     * Call next method in the pipeline and return its output
     */
  }
}