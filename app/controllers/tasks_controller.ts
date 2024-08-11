import type { HttpContext } from '@adonisjs/core/http'

import TasksService from "#services/tasks_service";
import { inject } from "@adonisjs/core";
import { storeTaskValidator, updateTaskValidator } from '#validators/task';
import { errors } from '@vinejs/vine';

@inject()
export default class TasksController {
    constructor(protected taskService: TasksService){}

    async index({request, response}: HttpContext){
        try {
            const data = await this.taskService.index(request.qs().page || 1, request.qs().per_page || 10);
            return response.status(200).json({message: "Data Found!", data, success: false});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async store({request, response}: HttpContext){
        try {
            await storeTaskValidator.validate(request.body());
            const {project_id, user_id, name, start_date, end_date} = request.body();

            const data = await this.taskService.store(project_id, user_id, name, start_date, end_date);
            return response.status(201).json({message: "Data created!", data, success: true});
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
            const data = await this.taskService.show(id);
            return response.status(200).json({message: "Data found!", data, success: true});
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }

    async update({request, response}: HttpContext){
        try {
            await updateTaskValidator.validate(request.body());
            const id = request.param('id');
            const {project_id, user_id, name, start_date, end_date} = request.body();
            const data = await this.taskService.update(id, project_id, user_id, name, start_date, end_date);
            return response.status(200).json({message: "Data updated!", data, success: true});
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
            if(await this.taskService.delete(id)){
                return response.status(200).json({message: "Data Deleted!", success: true});
            }
        } catch (e){
            return response.status(404).json({message: e.message, success: false});
        }
    }
}