import UsersService from '#services/users_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
    constructor(protected userService: UsersService){}
    async index({request, response}: HttpContext){
        try {
            const data = await this.userService.index(request.qs().page || 1, request.qs().per_page || 10);
            if(!data){
                return response.status(404).json({message: "Data not found!", success: false});
            }
            return response.status(200).json({message: 'Data found!', data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async store({request, response}: HttpContext){
        try {
            const { name, username, email, password } = request.body();

            if(!name || !username || !email || !password){
                return response.status(400).json({message: "Fill all of those data!", success: false});
            }
            const data = await this.userService.store(name, username, email, password);
            return response.status(201).json({message: "Data created!", data, success: true});
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async show({request, response}: HttpContext){
        try {
            const id = request.param('id');
            const data = await this.userService.show(id);
            return response.status(200).json({message: "Data found!", data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async update({request, response}: HttpContext){
        try {
            const id = request.param('id');
            const {name, username, email, password} = request.body();
            const data = await this.userService.update(id, name, username, email, password);
            return response.status(200).json({message: "Data updated!", data, success: true});
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async delete({request, response}: HttpContext){
        try {
            const id = request.param('id');
            if(await this.userService.delete(id)){
                return response.status(200).json({message: "Data Deleted!", success: true});
            }
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async changeAvatar({request, response}: HttpContext){
        try {
            const id = request.param('id');
            const avatar = request.file('avatar', {
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg']
            })
 
            if(!avatar?.isValid){
                return response.status(400).json({message: "The avatar field is required!", success: false});
            }
            
            const data =  await this.userService.changeAvatar(id, avatar);
            return response.status(200).json({message: "Avatar Changed!", data, success: true});
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async deleteAvatar({request, response}: HttpContext){
        try {
            const id = request.param('id');
            if(await this.userService.deleteAvatar(id)){
                return response.status(200).json({message: "Avatar Deleted!", success: true});
            }
        } catch (e){
            return response.status(500).json({message: e.message, success: false});
        }
    }
}