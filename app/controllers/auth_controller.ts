import AuthService from '#services/auth_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
    constructor(protected authService: AuthService) {}
    async register({request, response}: HttpContext){
        const data = request.only(['username', 'email', 'password', 'name']);

        if(!data.username || !data.email || !data.password || !data.name){
            return response.status(400).json({ message: "Those credentials are required!", success: false });
        }

        try {
            const user = await this.authService.register(data);
            return response.status(201).json({message: "User created!", user: user, success: true});
        } catch (e){
            return response.status(400).json({message:e.message, success: false});
        }
    }

    async login({request, response, auth}: HttpContext){
        const data = request.only(['username', 'password']);

        if(!data.username || !data.password){
            return response.status(400).json({ message: "Those credentials are required!", success: false });
        }

        try {
            const token = await this.authService.login(data, auth);
            if(!token){
                return response.status(404).json({message: "Those credentials doesn't match our records!", success: false});
            }
            return response.status(200).json({message: "User found!", token, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }
}