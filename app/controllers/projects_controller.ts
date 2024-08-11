import type { HttpContext } from '@adonisjs/core/http'
import ProjectsService from "#services/projects_service";
import { inject } from "@adonisjs/core";
import { storeProjectValidator, updateProjectValidator } from '#validators/project';
import { errors } from '@vinejs/vine';

@inject()
export default class ProjectsController {
    constructor(protected projectService: ProjectsService){}
    async index({request, response}: HttpContext){
        try {
            const data = await this.projectService.index(request.qs().page || 1, request.qs().per_page || 10);
            return response.status(200).json({message: "Data Found!", data: data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async store({request, response}: HttpContext){
        try {
            await storeProjectValidator.validate(request.body());
            const { name, start_date, end_date } = request.body();

            const data = await this.projectService.store(name, start_date, end_date);
            return response.status(200).json({message: "Data Stored!", data, success: true});

        } catch (e){
            if (e instanceof errors.E_VALIDATION_ERROR) {
                return response.status(400).json({message: e.messages, success: false});
            }
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async show({request, response}: HttpContext){
        try {
            const id = request.param('id');
            const data = await this.projectService.show(id);
            if(!data){
                return response.status(404).json({message: "Data not found!", success: false});
            }
            return response.status(200).json({message: "Data Found!", data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async update({request, response}: HttpContext){
        try {
            await updateProjectValidator.validate(request.body());
            const id = request.param('id');
            const { name, start_date, end_date } = request.body();
            const data = await this.projectService.update(id, name, start_date, end_date);
             return response.status(200).json({message: "Data Updated!", data, success: true});
        } catch (e){
            if (e instanceof errors.E_VALIDATION_ERROR) {
                return response.status(400).json({message: e.messages, success: false});
            }
            return response.status(500).json({message: e.message, success: false});
        }
    }

    async delete({request, response}: HttpContext){
        try {
            const id = request.param('id');
            if(await this.projectService.delete(id)){
                return response.status(200).json({message: "Data Deleted!", success: true});
            }
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }
}