import { inject } from "@adonisjs/core";
import AuthRepository from "../repositories/auth_repository.js";
import hash from "@adonisjs/core/services/hash";
import { Authenticators } from "@adonisjs/auth/types";
import { Authenticator } from "@adonisjs/auth";
import { MultipartFile } from "@adonisjs/core/bodyparser";
import fs from "fs";

@inject()
export default class AuthService {
    constructor(protected authRepository: AuthRepository){}

    public async register(data: any){
        return this.authRepository.create(data);
    }

    public async login(data: any){
        const user = await this.authRepository.login(data.username);
        if(!user || !(await hash.verify(user.password, data.password || ""))){
            return null;
        }

        let token;
        if(user.role == 'admin'){
            token = await this.authRepository.createAdminAccessToken(user);
        } else {
            token = await this.authRepository.createAccessToken(user);
        }
        return token
    }

    public async logout(auth: Authenticator<Authenticators>){
        return this.authRepository.logout(auth);
    }

    public async changeAvatar(id: string, avatar: MultipartFile){
        const oldPath = await this.authRepository.getOldAvatar(id);
        if(oldPath){
            fs.unlinkSync(oldPath);
        }
        const storePath = './uploads/avatar/';
        await avatar.move(storePath)
        return this.authRepository.changeAvatar(id, storePath + avatar.fileName);
    }

    public async deleteAvatar(id: string){
        const oldPath = await this.authRepository.getOldAvatar(id);
        if(oldPath){
            fs.unlinkSync(oldPath);
        }
        return this.authRepository.deleteAvatar(id);
    }
}