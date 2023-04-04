import { Api } from "./api";

class UsersApi extends Api {

    // {
    //     headers: { Authorization: `Bearer ${token}` }
    // }
    async login(data: {email: string; password: string}) {
        return await this.post('login', data);
    }
    async register(data: any) {
        return await this.post('register', data);
    }
    async kaka<T = any>(data: T) {
        return await this.get('login');
    }

}

const USERS_API = new UsersApi('users/');
export default USERS_API;