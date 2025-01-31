import { createContext, ReactNode, useContext, useState, useCallback, useEffect } from "react";
import RoteirosApi from "src/services/roteiro/RoteirosAPI";
import { AuthContext } from "./AuthContext";
import { getRealm } from "src/database/realm";
import { RoteiroSchemaType } from "src/database/schemas/RoteiroSchema";

type RoteiroContextType = {
    sincronizar: () => void,
    roteiros: RoteiroSchemaType[];
    loadRoteiros: () => void;
}

export const RoteirosContext = createContext<RoteiroContextType>({
    sincronizar: () => {},
    roteiros: [],
    loadRoteiros: () => {}
})

type RoteiroProviderProps = {
    children: ReactNode;
};


export function RoteiroProvider({children} : RoteiroProviderProps){
    const [roteiros, setRoteiros] = useState<RoteiroSchemaType[]>([])
    const {user} = useContext(AuthContext)

    async function loadRoteiros(){

        try {
            console.log('entrou no primeiro try')
    
            const realm = await getRealm();
            
            if(!realm.isClosed){
                console.log('realm aberto')

                const roteirosData = realm.objects<RoteiroSchemaType>("Roteiro");
        
                console.log("Roteiros carregados do banco: ", roteirosData); 

                setRoteiros(Array.from(roteirosData));
                    
    
            } else{
                console.log('realm fechado')
            }
        } catch (error) {
            console.error("Erro ao carregar roteiros:", error);
        }
    };

    async function saveDataRoteiros(roteiroData: RoteiroSchemaType){       
        
        const realm = await getRealm();
        try{
            console.log('saveDataRoteiros aberto o realm')
            realm.write(() => {
                realm.create('Roteiro', { 
                    acompanhante: roteiroData.acompanhante,
                    areas: roteiroData.areas.map(area => ({
                        area_id: area.area_id,
                        desc_area: area.desc_area || '', 
                    })),
                    roteiro_de_servico_id: roteiroData.roteiro_de_servico_id,
                    cliente_id: roteiroData.cliente_id,
                    nome_cliente: roteiroData.nome_cliente,
                    endereco: roteiroData.endereco,
                    data: roteiroData.data,
                    hora: roteiroData.hora,
                    descricao_servicos: roteiroData.descricao_servicos,
                    ponto_de_referencia: roteiroData.ponto_de_referencia,
                    localizacao_detalhada: roteiroData.localizacao_detalhada,
                    status: roteiroData.status,
                    tel: roteiroData.tel,
                    tel_1: roteiroData.tel_1,
                    tel_2: roteiroData.tel_2,
                    user_login: roteiroData.user_login,
                    veiculo_id: roteiroData.veiculo_id,
                    foto_os: roteiroData.foto_os,
                    revogado: roteiroData.revogado,
                    obs_ida: roteiroData.obs_ida,
                    sistema_id: roteiroData.sistema_id,
                    lat_cliente: roteiroData.lat_cliente,
                    lat_chegada: roteiroData.lat_chegada,
                    lat_saida: roteiroData.lat_saida,
                    hora_chegada: roteiroData.hora_chegada,
                    hora_saida: roteiroData.hora_saida,
                    armadilhas: roteiroData.armadilhas.map(armadilha => ({
                        QTD_CORPOS: armadilha.QTD_CORPOS,
                        QTD_VIVAS: armadilha.QTD_VIVAS,
                        SLOT1_ACAO: armadilha.SLOT1_ACAO,
                        SLOT1_STATUS: armadilha.SLOT1_STATUS,
                        SLOT2_ACAO: armadilha.SLOT2_ACAO,
                        SLOT2_STATUS: armadilha.SLOT2_STATUS,
                        SLOT3_ACAO: armadilha.SLOT3_ACAO,
                        SLOT3_STATUS: armadilha.SLOT3_STATUS,
                        SLOT4_ACAO: armadilha.SLOT4_ACAO,
                        SLOT4_STATUS: armadilha.SLOT4_STATUS,
                        SLOT5_ACAO: armadilha.SLOT5_ACAO,
                        SLOT5_STATUS: armadilha.SLOT5_STATUS,
                        SLOT6_ACAO: armadilha.SLOT6_ACAO,
                        SLOT6_STATUS: armadilha.SLOT6_STATUS,
                        TIPO_DE_PRAGA_ID: armadilha.TIPO_DE_PRAGA_ID,
                        area_id: armadilha.area_id,
                        armadilha_id: armadilha.armadilha_id,
                        codigo_armadilha: armadilha.codigo_armadilha,
                        complemento_area: armadilha.complemento_area,
                        desc_armadilha: armadilha.desc_armadilha,
                        nome_tipo_de_area: armadilha.nome_tipo_de_area,
                        nome_tipo_de_armadilha: armadilha.nome_tipo_de_armadilha,
                        numero_armadilha: armadilha.numero_armadilha,
                        sigla_armadilha: armadilha.sigla_armadilha,
                        tipo_de_armadilha_id: armadilha.tipo_de_armadilha_id
                    })),
                    produtos: roteiroData.produtos.map(produto => ({
                        citado_ida: produto.citado_ida,
                        nome_prod: produto.nome_prod,
                        pragas: produto.pragas || [],  // Definido como array vazio caso não tenha pragas
                        prod_id: produto.prod_id,
                        qtd_prevista: produto.qtd_prevista,
                        roteiro_de_servico_id: produto.roteiro_de_servico_id,
                        unidade: produto.unidade
                    })),
                    roteiros_plantas: roteiroData.roteiros_plantas.map(planta => ({
                        img64: planta.img64,
                        legenda: planta.legenda,
                        pavimento: planta.pavimento,
                        planta_baixa_id: planta.planta_baixa_id,
                        quadrante: planta.quadrante,
                        roteiro_de_servico_id: planta.roteiro_de_servico_id
                    })),
                    roteiros_pragas: roteiroData.roteiros_pragas.map(praga => ({
                        nome_servico: praga.nome_servico,
                        nome_tipo_de_servico: praga.nome_tipo_de_servico,
                        roteiro_de_servico_id: praga.roteiro_de_servico_id,
                        servico_id: praga.servico_id,
                        tipo_de_praga: praga.tipo_de_praga
                    })),
                });
            });


        }catch(error){
            console.error('Error saving data ==> ', error)
        }
    }
    
    
    async function requestRoteiros(): Promise<RoteiroSchemaType | undefined> {

        const apiReq = new RoteirosApi(user);
        try{

            const response = await apiReq.getRoteiros();

            if (response && response.data) {
                return response.data.roteiros; // Acessa diretamente os dados esperados
            }

           
        } catch(error){
            console.error('Request roteiros ==> ', error)
        }

        return undefined
    }

    async function sincronizar(){

        try{
            const roteirosSynced = await requestRoteiros()

            if (roteirosSynced) {
                saveDataRoteiros(roteirosSynced);
            }

        } catch(error){
            console.error('Sincronizar roteiros ==> ', error)
        } finally{
            loadRoteiros();
        }
    }

    useEffect(() => {
        loadRoteiros();
    },[])

    return(
        <RoteirosContext.Provider 
            value={{
                sincronizar,
                roteiros,
                loadRoteiros,
            }}
        >
            {children}
        </RoteirosContext.Provider>
    )
}