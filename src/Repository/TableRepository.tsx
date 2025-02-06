import Realm from "realm";
import { getRealm } from "src/database/realm";

export type INaoConformidade = {
    id: string;
    roteiro_id: string;
    area: string;
    nc: string;
    registrada: string;
    responsavel: string;
    medidasCorretivas: string;
    prazo: string;
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
    
            const loadedItems = storedNaoConformidades.map((item) => ({
                id: item.id,
                roteiro_id: item.roteiro_id,  // Adicionei caso precise do roteiro_id
                area: item.area,
                nc: item.nc,                  // Corrigido de 'naoConformidade' para 'nc'
                registrada: item.registrada,
                responsavel: item.responsavel,
                medidasCorretivas: item.medidasCorretivas,
                prazo: item.prazo,
            }));
    
            return loadedItems;
        } catch (error) {
            console.error("Erro ao carregar dados do banco:", error);
            return []; // Retorna um array vazio em caso de erro
        }
    }

    // ❌ Remover todas as Não Conformidades
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
