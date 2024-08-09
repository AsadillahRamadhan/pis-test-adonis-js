import { inject } from "@adonisjs/core";
import UsersRepository from "../repositories/users_repository.js";
import { MultipartFile } from "@adonisjs/core/bodyparser";
import fs from 'fs';

@inject()
export default class UsersService {
    constructor(protected userRepository: UsersRepository){}

    public async index(page: number, per_page: number){
        return this.userRepository.getAll(page, per_page);
    }

    public async store(name: string, username: string, email: string, password: string){
        return this.userRepository.store(name, username, email, password);
    }

    public async show(id: string){
        return this.userRepository.show(id);
    }

    public async update(id: string, name: string, username: string, email: string, password: string){
        return this.userRepository.update(id, name, username, email, password);
    }

    public async delete(id: string){
        return this.userRepository.delete(id);
    }

    public async changeAvatar(id: string, avatar: MultipartFile){
        const oldPath = await this.userRepository.getOldAvatar(id);
        if(oldPath){
            fs.unlinkSync(oldPath);
        }
        const storePath = './uploads/avatar/';
        await avatar.move(storePath)
        return this.userRepository.changeAvatar(id, storePath + avatar.fileName);
    }

    public async deleteAvatar(id: string){
        const oldPath = await this.userRepository.getOldAvatar(id);
        if(oldPath){
            fs.unlinkSync(oldPath);
        }
        return this.userRepository.deleteAvatar(id);
    }
}