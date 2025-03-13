import { getRealm } from "src/database/realm";

export type INaoConformidade = {
    roteiro_id: string;
    area_id: number;
    nc_id: number;
    registrada: string;
    resp: string;
    mc_id: number;
    prazo: number;
};
export default class TableRepository {
    constructor() {}

    async openRealm() {
        try {
            const realm = await getRealm();
            return Promise.resolve(realm);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async setNaoConformidade(naoConformidade: INaoConformidade) {
        try {
            const realm = await this.openRealm();
            realm.write(() => {
                realm.create("NaoConformidade", naoConformidade);
            });
        } catch (error) {
            console.error("Erro ao inserir não conformidade:", error);
        }
    }

    // 🔍 Obter todas as Não Conformidades
    async getNaoConformidades() {
        try {
            const realm = await this.openRealm();
            const result = realm.objects("NaoConformidade");
            return Promise.resolve(result);
        } catch (error) {
            console.error("Erro ao buscar não conformidades:", error);
            return Promise.reject(error);
        }
    }

    async getNaoConformidadesByRoteiroId(idServico: string): Promise<any> {
        try {
            const realm = await getRealm();
            const storedNaoConformidades = realm
                .objects("NaoConformidade")
                .filtered(`roteiro_id == '${idServico}'`);
    
            const loadedItems = storedNaoConformidades.map((item) => ({
                roteiro_id: item.roteiro_id,
                area_id: Number(item.area_id), 
                nc_id: Number(item.naoConformidade_id), 
                registrada: item.registrada_id,
                resp: item.responsavel,
                mc_id: Number(item.medidasCorretivas_id),
                prazo: Number(item.prazo_id),
            }));

            console.log(loadedItems);
    
            return loadedItems;
        } catch (error) {
            console.error("Erro ao carregar dados do banco:", error);
            return []; 
        }
    }

    async removeNaoConformidades() {
        try {
            const realm = await this.openRealm();
            realm.write(() => {
                const allNaoConformidades = realm.objects("NaoConformidade");
                realm.delete(allNaoConformidades);
            });
            return Promise.resolve(true);
        } catch (error) {
            console.error("Erro ao remover não conformidades:", error);
            return Promise.reject(error);
        }
    }

    // 🗑️ Remover uma Não Conformidade específica pelo ID
    async removeNaoConformidadeById(id: string) {
        try {
            const realm = await this.openRealm();
            realm.write(() => {
                const ncToDelete = realm.objectForPrimaryKey("NaoConformidade", id);
                if (ncToDelete) {
                    realm.delete(ncToDelete);
                }
            });
            return Promise.resolve(true);
        } catch (error) {
            console.error("Erro ao remover não conformidade:", error);
            return Promise.reject(error);
        }
    }
}
