import ApiManagement from "../ApiManagement";
import { AxiosError, AxiosResponse } from "axios";

class CheckInApi extends ApiManagement {
    
    constructor(user: { login: string; password: string; id: string; replica: string; token?: string;}){
        super(user)
    }

    async getData(): Promise<AxiosResponse | void>  {
        try {
          return await this.axios().get('checkin', {
            params: {
              token: this._user.token,
            },
          });
        } catch (error) {
            const axiosError = error as AxiosError;
            if(axiosError.response){
                switch (axiosError.response.status) {
                    case 401:
                        await this.refreshToken();

                        return await this.getData();
                    default:
                        console.error('getData Error ==>', axiosError.message);
                }
            } else{
                console.log('getData undefined');
            }

        }
    }
}

export default CheckInApi;