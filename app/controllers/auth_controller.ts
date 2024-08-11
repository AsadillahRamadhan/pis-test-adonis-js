import AuthService from '#services/auth_service';
import { loginAuthValidator, registerAuthValidator } from '#validators/auth';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine';

@inject()
export default class AuthController {
    constructor(protected authService: AuthService) {}
    async register({request, response}: HttpContext){
        try {
            const data = await request.validateUsing(registerAuthValidator);
            const user = await this.authService.register(data);
            return response.status(201).json({message: "User created!", user: user, success: true});
        } catch (e){
            if (e instanceof errors.E_VALIDATION_ERROR) {
                return response.status(400).json({message: e.messages, success: false});
            }
            return response.status(400).json({message:e.message, success: false});
        }
    }

    async login({request, response}: HttpContext){
        try {
            const data = await request.validateUsing(loginAuthValidator);
            const token = await this.authService.login(data);
            if(!token){
                return response.status(404).json({message: "Those credentials doesn't match our records!", success: false});
            }
            return response.status(200).json({message: "User found!", token, success: true});
        } catch (e){
            if (e instanceof errors.E_VALIDATION_ERROR) {
                return response.status(400).json({message: e.messages, success: false});
            }
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async logout({auth, response}: HttpContext){
        try {
            await this.authService.logout(auth);
            return response.ok({message: "Logged Out!", success: true});
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async changeAvatar({auth, request, response}: HttpContext){
        try {
            const avatar = request.file('avatar', {
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg']
            })
 
            if(!avatar?.isValid){
                return response.status(400).json({message: "The avatar field is required!", success: false});
            }
            const data =  await this.authService.changeAvatar(auth.user!.$attributes.id, avatar);
            return response.status(200).json({message: "Avatar Changed!", data, success: true});
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async deleteAvatar({auth, response}: HttpContext){
        try {
            if(await this.authService.deleteAvatar(auth.user!.$attributes.id)){
                return response.status(200).json({message: "Avatar Deleted!", success: true});
            }
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }
}