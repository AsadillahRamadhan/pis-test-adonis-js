import User from "#models/user";

export default class UsersRepository {
    public async getAll(page: number, perPage: number){
        const data = await User.query().preload('tasks').paginate(page, perPage);
        return data;
    }

    public async store(name: string, username: string, email: string, password: string){
        const data = await User.create({name, username, email, password, role: "user"});
        return data;
    }

    public async show(id: string){
        const data = await User.findOrFail(id);
        return data;
    }

    public async update(id: string, name: string, username: string, email: string, password: string){
        const data = await User.findOrFail(id);
        data.merge({name, username, password, email});
        await data.save();
        return data;
    }

    public async delete(id: string){
        (await User.findOrFail(id)).delete();
        return true;
    }

    public async getOldAvatar(id: string){
        const data = await User.findOrFail(id);
        return data.avatar;
    }

    public async changeAvatar(id: string, avatar: string){
        const data = await User.findOrFail(id);
        data.merge({avatar});
        await data.save();
        return data;
    }

    public async deleteAvatar(id: string){
        const data = await User.findOrFail(id);
        data.avatar = null;
        await data.save();
        return true;
    }
}