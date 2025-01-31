import ApiManagement from "../ApiManagement";
import { AxiosError, AxiosResponse } from "axios";

class RoteirosApi extends ApiManagement {
    constructor(user: { login: string; password: string; id: string; replica: string; token?: string;}){
        super(user)
    }

    async getRoteiros(): Promise<AxiosResponse | void>  {
        console.log('user token', this.user.token)
        try {
            let request = await this.axios().get('roteiros', {
                params: {
                    token: this._user.token,
                },
            });
    
            return request;
        } catch (error) {
            console.error('RoteirosAPI - Erro na requisição:', error);
    
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                switch (axiosError.response.status) {
                    case 401:
                        console.log('RoteirosAPI - Token expirado, renovando token');
                        this.refreshToken();
                        return this.getRoteiros(); // Retorna a nova promessa
                    default:
                        console.error('RoteirosAPI - Outro erro', axiosError.message);
                }
            } else {
                console.error('RoteirosAPI - Erro inesperado:', (error as Error).message);
            }
        }
    }
}

export default RoteirosApi