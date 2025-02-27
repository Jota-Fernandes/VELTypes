import Realm from "realm";
import { getRealm } from "src/database/realm";

export type INaoConformidade = {
    id: string;
    roteiro_id: string;
    area_id: string;
    naoConformidade_id: string;
    registrada: string;
    responsavel: string;
    medidasCorretivas_id: string;
    prazo_id: string;
};
export default class TableRepository {
    constructor() {}

    // 📂 Abrir conexão com o banco Realm
    async openRealm() {
        try {
            const realm = await getRealm();
            return Promise.resolve(realm);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // ✅ Inserir uma nova Não Conformidade
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

    async getNaoConformidadesByRoteiroId(idServico: string): Promise<INaoConformidade[]> {
        try {
            const realm = await getRealm();
            const storedNaoConformidades = realm
                .objects<INaoConformidade>("NaoConformidade")
                .filtered(`roteiro_id == '${idServico}'`);
    
            const loadedItems: INaoConformidade[] = storedNaoConformidades.map((item) => ({
                id: item.id,
                roteiro_id: item.roteiro_id,
                area_id: item.area_id, // Convertendo para número
                naoConformidade_id: item.naoConformidade_id, 
                registrada: item.registrada,
                responsavel: item.responsavel,
                medidasCorretivas_id: item.medidasCorretivas_id,
                prazo_id: item.prazo_id,
            }));
    
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
