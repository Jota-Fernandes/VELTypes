import { getRealm } from "src/database/realm";
import { RoteiroSchemaType } from "src/database/schemas/RoteiroSchema";

export type IProdutoArea = {

}

export default class ProdutoAreaRepository{

    async openRealm() {
        try {
            const realm = await getRealm();
            return Promise.resolve(realm);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async getProdutos(idServico: string): Promise<IProdutoArea[]>{
        try {
            const realm = await getRealm();
            const storedNaoConformidades = realm
                .objects("ProdutosPorAreaTable")
                .filtered(`roteiro_id == '${idServico}'`);

                const loadedItems = storedNaoConformidades.map((item) => ({
                    roteiro_id: item.roteiro_id,
                    prod_id: Number(item.produto_id),
                    qtd: Number(item.qtd),
                    area_id: Number(item.area_id),
                    equipto_id: Number(item.equipto_id),
                    praga_id: Number(item.praga_id),
                }));

                console.log("Loaded", loadedItems)
        
                return loadedItems;
            
        } catch (error) {
            console.error("Erro ao carregar dados do banco:", error);
            return [];
        }
    }
}