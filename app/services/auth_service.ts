import { inject } from "@adonisjs/core";
import AuthRepository from "../repositories/auth_repository.js";
import hash from "@adonisjs/core/services/hash";
// import { AuthContract } from '@ioc:Adonis/Addons/Auth'

@inject()
export default class AuthService {
    constructor(protected authRepository: AuthRepository){}

    public async register(data: any){
        return this.authRepository.create(data);
    }

    public async login(data: any, auth: any){
        const user = await this.authRepository.login(data.username);
        const veri = await hash.verify(user.password, data.password);
        console.log(veri, user.password, data.password, await hash.make('12345678'))
        if(!user || !(await hash.verify(user.password.split('$')[4], data.password || ""))){
            return null;
        }

        const token = await auth.use('api').generate(user)
        return token.token
    }
}