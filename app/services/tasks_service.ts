import { inject } from "@adonisjs/core";
import TasksRepository from "../repositories/tasks_repository.js";
import { DateTime } from "luxon";

@inject()
export default class TasksService {
    constructor(protected taskRepository: TasksRepository){}

    public async index(page: number, perPage: number){
        return this.taskRepository.getAll(page, perPage);
    }

    public async store(project_id: string, user_id: string, name: string, start_date: string, end_date: string){
        const sd = DateTime.fromISO(start_date);
        const ed = DateTime.fromISO(end_date);
        return this.taskRepository.store(project_id, user_id, name, sd, ed)
    }

    public async show(id: string){
        return this.taskRepository.show(id);
    }

    public async update(id: string, project_id: string, user_id: string, name: string, start_date: string, end_date: string){
        const sd = start_date ? DateTime.fromISO(start_date) : start_date;
        const ed = end_date ? DateTime.fromISO(end_date) : end_date;
        return this.taskRepository.update(id, project_id, user_id, name, sd, ed);
    }

    public async delete(id: string){
        return this.taskRepository.delete(id);
    }
}