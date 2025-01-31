import { ParamListBase } from "@react-navigation/native";

export declare global {
    namespace ReactNavigation {
        interface RootParamList extends ParamListBase{
            RoteiroMenu: { roteiro: RoteiroSchemaType };
            Servicos: undefined;
            Avistamentos: undefined;
            MenuArmadilhas: undefined;
            NaoConformidades: undefined;
            BaixaNaoConformidades: undefined;
            ProdutosPorArea: undefined;
            DadosServicos: undefined;
            DadosReview: undefined;
            Armadilha: undefined;
            Configurações: undefined;
            ServiçosExecutados: undefined
        }
    }
}