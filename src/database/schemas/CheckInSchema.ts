export type GeneralDataType = {
    acao_arm: {
        acao_id?: string;
        desc_acao?: string;
        gera_consumo?: string;
        num_elem?: string;
    }[];
    condicoes: {
        condicao_id?: string;
        sigla_condicao?: string;
    }[];
    equiptos: {
        equipto_id?: string;
        desc_equipto?: string;
    }[];
    medidas_corretivas: {
        mc_id?: string;
        desc_mc?: string;
    }[];
    nao_conformidades: {
        nc_id?: string;
        desc_nc?: string;
    }[];
    niveis_de_higiene: {
        nivel_higiene_id?: string;
        sigla_nivel_de_higiene?: string;
    }[];
    ocorrencias: {
        oco_id?: string;
        desc_oco?: string;
        praga_id?: string;
    }[];
    pragas: {
        praga_id?: string;
        desc_praga?: string;
    }[];
    status_arm: {
        status_id?: string;
        desc_status?: string;
        num_elem?: string;
    }[];
    tipos_arm: {
        tipo_id: string;
        desc_tipo: string;
        sigla_tipo: string;
        elem1?: string;
        elem2?: string;
        elem3?: string;
        elem4?: string;
        elem5?: string;
        elem6?: string;
    }[];
    veiculos: {
        veiculo_id?: string;
        desc_veiculo?: string;
    }[];
};

export type SecondGeneralDataType = {
    AcaoArm: {
        acao_id?: string;
        desc_acao?: string;
        gera_consumo?: string;
        num_elem?: string;
    }[];
    Condicoes: {
        condicao_id?: string;
        sigla_condicao?: string;
    }[];
    Equiptos: {
        equipto_id?: string;
        desc_equipto?: string;
    }[];
    MedidasCorretivas: {
        mc_id?: string;
        desc_mc?: string;
    }[];
    NaoConformidades: {
        nc_id?: string;
        desc_nc?: string;
    }[];
    NiveisDeHigiene: {
        nivel_higiene_id?: string;
        sigla_nivel_de_higiene?: string;
    }[];
    Ocorrencias: {
        oco_id?: string;
        desc_oco?: string;
        praga_id?: string;
    }[];
    Pragas: {
        praga_id?: string;
        desc_praga?: string;
    }[];
    StatusArm: {
        status_id?: string;
        desc_status?: string;
        num_elem?: string;
    }[];
    TiposArm: {
        tipo_id: string;
        desc_tipo: string;
        sigla_tipo: string;
        elem1?: string;
        elem2?: string;
        elem3?: string;
        elem4?: string;
        elem5?: string;
        elem6?: string;
    }[];
    Veiculos: {
        veiculo_id?: string;
        desc_veiculo?: string;
    }[];
};


export const GeneralDataSchema = {
    name: "GeneralData",
    properties: {
        id: 'string',
        AcaoArm: "AcaoArm[]" ,  // Usando a notação correta para listas de objetos
        Condicoes: "Condicoes[]",  // Usando a notação correta para listas de objetos
        Equiptos: "Equiptos[]",
        MedidasCorretivas: "MedidasCorretivas[]",
        NaoConformidades: "NaoConformidades[]",
        NiveisDeHigiene: "NiveisDeHigiene[]",
        Ocorrencias: "Ocorrencias[]",
        Pragas: "Pragas[]",
        StatusArm: "StatusArm[]",
        TiposArm: "TiposArm[]",
        Veiculos: "Veiculos[]"
    },
    primaryKey: 'id',
};

export const AcaoArmSchema = {
    name: "AcaoArm",
    properties: {
        acao_id: 'string?',
        desc_acao: 'string?',
        gera_consumo: 'string?',
        num_elem: 'string?'
    },
};

export const CondicoesSchema = {
    name: "Condicoes",
    properties: {
        condicao_id: 'string?',
        sigla_condicao: 'string?',
    },
};

export const EquiptosSchema = {
    name: "Equiptos",
    properties: {
        equipto_id: 'string?',
        desc_equipto: 'string?',
    },
};

export const MedidasCorretivasSchema = {
    name: "MedidasCorretivas",
    properties: {
        mc_id: 'string?',
        desc_mc: 'string?',
    },
};

export const NaoConformidadesSchema = {
    name: "NaoConformidades",
    properties: {
        nc_id: 'string?',
        desc_nc: 'string?',
    },
};

export const NiveisDeHigieneSchema = {
    name: "NiveisDeHigiene",
    properties: {
        nivel_higiene_id: 'string?',
        sigla_nivel_de_higiene: 'string?',
    },
};

export const OcorrenciasSchema = {
    name: "Ocorrencias",
    properties: {
        oco_id: 'string?',
        desc_oco: 'string?',
        praga_id: 'string?',
    },
};

export const PragasSchema = {
    name: "Pragas",
    properties: {
        praga_id: 'string?',
        desc_praga: 'string?',
    },
};

export const StatusArmSchema = {
    name: "StatusArm",
    properties: {
        status_id: 'string?',
        desc_status: 'string?',
        num_elem: 'string?'
    },
};

export const TiposArmSchema = {
    name: "TiposArm",
    properties: {
        tipo_id: 'string',
        desc_tipo: 'string',
        sigla_tipo: 'string',
        elem1: 'string?',
        elem2: 'string?',
        elem3: 'string?',
        elem4: 'string?',
        elem5: 'string?',
        elem6: 'string?',
    },
};

export const VeiculosSchema = {
    name: "Veiculos",
    properties: {
        veiculo_id: 'string?',
        desc_veiculo: 'string?',
    },
};
