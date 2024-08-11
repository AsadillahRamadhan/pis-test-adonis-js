import User from "#models/user";
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
}