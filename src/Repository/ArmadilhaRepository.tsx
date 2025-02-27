import { getRealm } from "src/database/realm";
import { RoteiroSchemaType } from "src/database/schemas/RoteiroSchema";

export type IArmadilhas = {
    roteiro_de_servico_id: string;
    armadilha_id: string;
    area_id?: string;
    complemento_area: string | null;
    sigla_armadilha: string;
    tipo_de_armadilha_id: string;
    TIPO_DE_PRAGA_ID: string | null;
    nome_tipo_de_armadilha: string;
    nome_tipo_de_area: string;
    numero_armadilha: string;
    desc_armadilha: string;
    QTD_VIVAS: string | null;
    QTD_CORPOS: string | null;
    codigo_armadilha: string;
    SLOT1_ACAO: string | null;
    SLOT1_STATUS: string | null;
    SLOT2_ACAO: string | null;
    SLOT2_STATUS: string | null;
    SLOT3_ACAO: string | null;
    SLOT3_STATUS: string | null;
    SLOT4_ACAO: string | null;
    SLOT4_STATUS: string | null;
    SLOT5_ACAO: string | null;
    SLOT5_STATUS: string | null;
    SLOT6_ACAO: string | null;
    SLOT6_STATUS: string | null;
}

export default class ArmadilhaRepository{

    async openRealm() {
        try {
            const realm = await getRealm();
            return Promise.resolve(realm);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async getArmadilha(idServico: string): Promise<IArmadilhas[]>{
        console.log("getArmadilha entrou")
        try {
            const realm = await getRealm();

            const roteiro = realm.objectForPrimaryKey<RoteiroSchemaType>("Roteiro", idServico);

            if (!roteiro) {
                console.log(`Nenhum roteiro encontrado com o ID ${idServico}`);
                return [];
            }

            const storedArmadilhas = roteiro.armadilhas || [];
    
            const loadedItems: IArmadilhas[] = storedArmadilhas.map((item) => ({
                roteiro_de_servico_id: idServico,
                armadilha_id: item.armadilha_id ?? "",
                area_id: item.area_id ?? "",
                complemento_area: item.complemento_area ?? null, 
                sigla_armadilha: item.sigla_armadilha ?? "",
                tipo_de_armadilha_id: item.tipo_de_armadilha_id ?? "",
                TIPO_DE_PRAGA_ID: item.TIPO_DE_PRAGA_ID ?? null,
                nome_tipo_de_armadilha: item.nome_tipo_de_armadilha ?? "",
                nome_tipo_de_area: item.nome_tipo_de_area ?? "",
                numero_armadilha: item.numero_armadilha ?? "",
                desc_armadilha: item.desc_armadilha ?? "",
                QTD_VIVAS: item.QTD_VIVAS ?? null,
                QTD_CORPOS: item.QTD_CORPOS ?? null,
                codigo_armadilha: item.codigo_armadilha ?? "",
                SLOT1_ACAO: item.SLOT1_ACAO ?? null,
                SLOT1_STATUS: item.SLOT1_STATUS ?? null,
                SLOT2_ACAO: item.SLOT2_ACAO ?? null,
                SLOT2_STATUS: item.SLOT2_STATUS ?? null,
                SLOT3_ACAO: item.SLOT3_ACAO ?? null,
                SLOT3_STATUS: item.SLOT3_STATUS ?? null,
                SLOT4_ACAO: item.SLOT4_ACAO ?? null,
                SLOT4_STATUS: item.SLOT4_STATUS ?? null,
                SLOT5_ACAO: item.SLOT5_ACAO ?? null,
                SLOT5_STATUS: item.SLOT5_STATUS ?? null,
                SLOT6_ACAO: item.SLOT6_ACAO ?? null,
                SLOT6_STATUS: item.SLOT6_STATUS ?? null
            }));
    
            return loadedItems;
        } catch (error) {
            console.error("Erro ao carregar dados do banco:", error);
            return [];
        }
    }
}