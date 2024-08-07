import Project from "#models/project";
import { DateTime } from "luxon";

export default class ProjectsRepository {
    public async getAll(page: number, perPage: number){
        const data = await Project.query().preload('tasks').paginate(page, perPage);
        return data;
    }

    public async store(name: string, start_date: DateTime, end_date: DateTime){
        const data = await Project.create({name, start_date, end_date});
        return data;
    }

    public async show(id: string){
        const data = await Project.findOrFail(id);
        await data.load('tasks');
        return data;
    }

    public async update(id: string, name: string, start_date: any, end_date: any){
        const data = await Project.findOrFail(id);
        data.merge({name, start_date, end_date});
        await data.save();
        return data;
    }

    public async delete(id: string){
        const data = await Project.findOrFail(id);
        data.delete();
        return true;
    }
}