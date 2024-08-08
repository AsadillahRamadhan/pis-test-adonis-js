import Task from "#models/task";
import { DateTime } from "luxon";

export default class TasksRepository{
    public async getAll(page: number, perPage: number){
        const data = await Task.query().preload('project').preload('user').paginate(page, perPage);
        return data;
    }

    public async store(project_id: string, user_id: string, name: string, start_date: DateTime, end_date: DateTime){
        const data = await Task.create({project_id, user_id, name, start_date, end_date});
        return data;
    }

    public async show(id: string){
        const data = await Task.findOrFail(id);
        await data.load('project');
        await data.load('user');
        return data;
    }

    public async update(id: string, project_id: string, user_id: string, name: string, start_date: any, end_date: any){
        const data = await Task.findOrFail(id);
        data.merge({project_id, user_id, name, start_date, end_date});
        await data.save();
        return data;
    }

    public async delete(id: string){
        const data = await Task.findOrFail(id);
        data.delete();
        return true;
    }
}