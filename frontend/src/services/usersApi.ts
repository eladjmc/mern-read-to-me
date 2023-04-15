import { RTMSession } from "./RTMSession";
import { Api } from "./api";

class UsersApi extends Api {
  // {
  //     headers: { Authorization: `Bearer ${token}` }
  // }
  async login(data: { email: string; password: string }) {
    return await this.post("login", data);
  }
  async register(data: any) {
    return await this.post("register", data);
  }

  async getUser() {
    const config = {
        headers: { authorization: `Bearer ${RTMSession.token?.toString()}` }
    };    
    return await this.get("current",config);
  }
  async getDirectories() {
    const config = {
        headers: { authorization: `Bearer ${RTMSession.token?.toString()}` }
    };    
    return await this.get("get-directories",config);
  }

  async deleteAllDirectories() {
    const config = {
        headers: { authorization: `Bearer ${RTMSession.token?.toString()}` }
    };    
    return await this.delete("delete-directories",config);
  }

  async deleteCurrentUser() {
    const config = {
        headers: { authorization: `Bearer ${RTMSession.token?.toString()}` }
    };    
    return await this.delete("delete-user",config);
  }
}

const USERS_API = new UsersApi("users/");
export default USERS_API;
