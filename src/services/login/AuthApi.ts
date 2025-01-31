import velApi from "../api";

export default class AuthApi{
    private _replica?: string;

    constructor(replica: string){
        if(replica){
            this._replica = replica
        }
    }

    async get(login: string, password: string, replica: string){
        if(replica){
            this._replica = replica
        }

        return await velApi.get(this._replica + '/api_v2/login/Login',{
            params: {
                login: login,
                senha: password
            }
        });
    }
}