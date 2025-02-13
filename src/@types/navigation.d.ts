import { ParamListBase } from "@react-navigation/native";
import { GeneralDataType, SecondGeneralDataType } from "src/database/schemas/CheckInSchema";

export declare global {
    namespace ReactNavigation {
        interface RootParamList extends ParamListBase{
            RoteiroMenu: { roteiro: RoteiroSchemaType, generalData: SecondGeneralDataType, armadilha };
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
            ServiçosExecutados: undefined;
            assinatura: { text: string; onOK: (signature: string) => void };
        }
    }
}