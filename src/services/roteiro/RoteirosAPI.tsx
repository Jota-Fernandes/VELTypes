import ApiManagement from "../ApiManagement";
import { AxiosError, AxiosResponse } from "axios";
import { RoteiroSchemaType } from "src/database/schemas/RoteiroSchema";
import TableRepository from "src/Repository/TableRepository";

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
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                switch (axiosError.response.status) {
                    case 401:
                        console.log('RoteirosAPI - Token expirado, renovando token');
                        const newToken = await this.refreshToken();
                        if (newToken) {
                            this._user.token = newToken;
                            return this.getRoteiros();
                        }
                    default:
                        console.error('RoteirosAPI - Outro erro', axiosError.message);
                }
            } else {
                console.error('RoteirosAPI - Erro inesperado:', (error as Error).message);
            }
        }
    }

    async sendRoteiros(roteiro: RoteiroSchemaType[]) {
        console.log("roteiro", roteiro)
        return await Promise.all(
          roteiro.map(async servico => {
            const idServico = servico.roteiro_de_servico_id;

            const tableRep = new TableRepository();
            
            const naoConformidadesByRoteiroId = await tableRep.getNaoConformidadesByRoteiroId(idServico);

            console.log("naoConformidadesByRoteiroId", naoConformidadesByRoteiroId)
    
            const data = [
/*               {
                roteiro_de_servico_id: idServico,
                token: this._user.token,
                packages:
                  servico.armadilhas.length === 0 ? 1 : servico.armadilhas.length,
                type: 'armadilhas',
                data: servico.armadilhas,
              }, */
            /*   {
                roteiro_de_servico_id: idServico,
                token: this._user.token,
                packages: servico.reg_oco.length === 0 ? 1 : servico.reg_oco.length,
                type: 'reg_oco',
                data: servico.reg_oco,
              }, */
           /*    {
                roteiro_de_servico_id: idServico,
                token: this._user.token,
                packages:
                  servico.reg_prod_area.length === 0
                    ? 1
                    : servico.reg_prod_area.length,
                type: 'reg_prod_area',
                data: servico.reg_prod_area,
              }, */
              {
                roteiro_de_servico_id: idServico,
                token: this._user.token,
                packages: naoConformidadesByRoteiroId.length === 0 ? 1 : naoConformidadesByRoteiroId.length,
                type: 'reg_nc',
                data: naoConformidadesByRoteiroId,
                charsCount: 0
              },
           /*    {
                roteiro_de_servico_id: idServico,
                token: this._user.token,
                packages: servico.foto_os.length === 0 ? 1 : servico.foto_os.length,
                type: 'foto_os',
                data: servico.foto_os,
              }, */
            ];
    
            const header = {
              roteiro_de_servico_id: idServico,
              token: this._user.token,
              type: 'header',
              data: {...servico},
              charsCount: 0
            };

            data.forEach(item => {
              const key = item.type as keyof typeof header.data;
              if (key in header.data) {
                  delete header.data[key];
              }
            });
    
            header.charsCount = JSON.stringify(header.data).length;
    
            return await this.axios()
              .post('mobile/servicosExecutados', header)
              .then(async () => {
                return await Promise.all(
                  data.map(async pkg => {
                    if (pkg.packages === 1) {
                      pkg.charsCount = JSON.stringify(pkg.data).length;
    
                      return await this.axios()
                        .post('mobile/servicosExecutados', pkg)
                        .catch(Promise.reject);
                    } else {
                      return await Promise.all(
                        pkg.data.map(async (subpkg : any, index : any) => {
                          const toSend = {
                            roteiro_de_servico_id: pkg.roteiro_de_servico_id,
                            token: pkg.token,
                            type: pkg.type,
                            packages: pkg.packages,
                            packageId: index + 1,
                            data: subpkg,
                            charsCount: JSON.stringify(subpkg).length,
                          };
    
                          return await this.axios()
                            .post('mobile/servicosExecutados', toSend)
                            .catch(Promise.reject);
                        }),
                      ).catch(Promise.reject);
                    }
                  }),
                );
              })
              .then(async () => {
                return await this.axios()
                  .post('mobile/processaServicos', {
                    token: this._user.token,
                    roteiro_de_servico_id: servico.roteiro_de_servico_id,
                  })
                  .catch(Promise.reject);
              })
              .catch(Promise.reject);
        }),
        ).catch(error => {
          throw error;
        });
      } 
}

export default RoteirosApi