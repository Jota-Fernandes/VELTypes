import Realm from 'realm';
import { AuthSchema } from './schemas/AuthSchema';
import { 
    RoteiroSchema, 
    AreaSchema, 
    RoteirosPragas, 
    ArmadilhasSchema , 
    ProdutosSchema , 
    RoteiroPlantasSchema, 
    NC_previasSchema  
} from './schemas/RoteiroSchema';
import { 
    PragasSchema, 
    AcaoArmSchema, 
    CondicoesSchema, 
    EquiptosSchema, 
    GeneralDataSchema,
    MedidasCorretivasSchema,
    NaoConformidadesSchema,
    NiveisDeHigieneSchema,
    OcorrenciasSchema,
    StatusArmSchema,
    TiposArmSchema,
    VeiculosSchema
} from './schemas/CheckInSchema';
import { 
    NaoConformidade,
    Ocorrencias,
    ProdutosPorArea
} from './schemas/TableSchemas';

let realmInstance: Realm | null = null;

export const getRealm = async () => {

    if (!realmInstance) {
        realmInstance = await Realm.open({
            path: "database",  // Nome único para o seu banco de dados
            schema: [
                AuthSchema,
                RoteiroSchema,
                AreaSchema,
                ArmadilhasSchema,
                ProdutosSchema,
                RoteirosPragas,
                RoteiroPlantasSchema,
                NC_previasSchema,
                PragasSchema,
                AcaoArmSchema,
                CondicoesSchema,
                EquiptosSchema,
                MedidasCorretivasSchema,
                NaoConformidadesSchema,
                NiveisDeHigieneSchema,
                OcorrenciasSchema,
                StatusArmSchema,
                TiposArmSchema,
                VeiculosSchema,
                GeneralDataSchema,
                NaoConformidade,
                Ocorrencias,
                ProdutosPorArea
            ],
        });
    }

    return realmInstance;
};
