import axios from 'axios'

class ApiManagement{
    public _user: { login: string; password: string; id: string; replica: string; token?: string;};

    constructor(user: { login: string; password: string; id: string; replica: string; token?: string;}){
        this._user = user;
    }

    get user(){
        return this._user;
    }

    set user(newUser){
        this._user = newUser;
    }

    axios(){
        if (this._user && this._user.login) {
            return axios.create({
              baseURL:
                'https://www.phcfocosistema.com.br/' + this._user.replica + '/api_v2',
            });
          } else {
            throw new Error('Não foi definido nenhum usuário');
          }
    }
 
    async refreshToken() {
      try {
            const newUser = await this.axios().get(`/login/Login?login=${this._user.login}&senha=${this._user.password}`);

        } catch (error) {
            console.error('RefreshToken ==> ', error);
            return error;
        }
    }
}

export default ApiManagement