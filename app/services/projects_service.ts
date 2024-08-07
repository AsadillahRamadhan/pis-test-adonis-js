import { inject } from "@adonisjs/core";
import ProjectsRepository from "../repositories/projects_repository.js";
import { DateTime } from "luxon";

@inject()
export default class ProjectsService {
    constructor(protected projectRepository: ProjectsRepository){}

    public async index(page: number, perPage: number){
        return this.projectRepository.getAll(page, perPage);
    }

    public async store(name: string, start_date: string, end_date: string){
        const sd = DateTime.fromISO(start_date);
        const ed = DateTime.fromISO(end_date);
        return this.projectRepository.store(name, sd, ed);
    }
    
    public async show(id: string){
        return this.projectRepository.show(id);
    }

    public async update(id: string, name: string, start_date: string, end_date: string){
        const sd = start_date ? DateTime.fromISO(start_date) : start_date;
        const ed = end_date ? DateTime.fromISO(end_date) : end_date;
        return this.projectRepository.update(id, name, sd, ed);
    }

    public async delete(id: string){
        return this.projectRepository.delete(id);
    }
}