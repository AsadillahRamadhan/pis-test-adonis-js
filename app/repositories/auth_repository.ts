import User from "#models/user";
import { Authenticator } from "@adonisjs/auth";
import { Authenticators } from "@adonisjs/auth/types";
export default class AuthRepository {
    public async create(data: Partial<User>): Promise<User | null>{
        return User.create(data);
    }

    public async login(username: Partial<User>): Promise<any>{
        return User.findBy('username', username);
    }

    public async createAccessToken(user: User){
        return User.accessTokens.create(user, ['user']);
    }

    public async createAdminAccessToken(user: User){
        return User.accessTokens.create(user, ['admin']);
    }

    public async logout(auth: Authenticator<Authenticators>){
        const user = auth.user!;
        await User.accessTokens.delete(user, user.currentAccessToken.identifier);
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