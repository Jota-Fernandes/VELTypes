export type RoteiroSchemaType = {
    acompanhante: string,
    areas: Array<{
        area_id: string,
        desc_area?: string
    }>,
    armadilhas: Array<{
        QTD_CORPOS?: string,
        QTD_VIVAS?: string,
        SLOT1_ACAO?: string,
        SLOT1_STATUS?: string,
        SLOT2_ACAO?: string,
        SLOT2_STATUS?: string,
        SLOT3_ACAO?: string,
        SLOT3_STATUS?: string,
        SLOT4_ACAO?: string,
        SLOT4_STATUS?: string,
        SLOT5_ACAO?: string,
        SLOT5_STATUS?: string,
        SLOT6_ACAO?: string,
        SLOT6_STATUS?: string,
        TIPO_DE_PRAGA_ID?: string,
        area_id?: string,
        armadilha_id?: string,
        codigo_armadilha?: string,
        complemento_area?: string,
        desc_armadilha?: string,
        nome_tipo_de_area?: string,
        nome_tipo_de_armadilha?: string,
        numero_armadilha?: string,
        sigla_armadilha?: string,
        tipo_de_armadilha_id?: string
    }>,
    cliente_id: string,
    data: string,
    descricao_servicos: string,
    endereco: string,
    foto_os: string,
    hora: string,
    hora_chegada?: string,
    hora_saida?: string,
    lat_chegada?: string,
    lat_cliente: string,
    lat_saida?: string,
    localizacao_detalhada: string,
    nc_previas: Array<Object>,
    nome_cliente: string,
    obs_ida?: string,
    orcamento_id?: string,
    ponto_de_referencia?: string,
    produtos: Array<{
        citado_ida: string,
        nome_prod: string,
        pragas?: Array<Object>,
        prod_id: string,
        qtd_prevista: string,
        roteiro_de_servico_id: string,
        unidade: string,
    }>,
    revogado?: string,
    roteiro_de_servico_id: string,
    roteiros_plantas: Array<{
        img64?: string,
        legenda?: string,
        pavimento?: string,
        planta_baixa_id?: string,
        quadrante?: string,
        roteiro_de_servico_id: string,
    }>,
    roteiros_pragas: Array<{
        nome_servico: string,
        nome_tipo_de_servico: string,
        roteiro_de_servico_id: string,
        servico_id: string,
        tipo_de_praga: string,
    }>,
    sistema_id: string,
    status: string,
    tel?: string,
    tel_1?: string,
    tel_2?: string,
    user_login: string,
    veiculo_id?: string,
}

export const RoteiroSchema = {
    name: 'Roteiro',
    
    properties: {
        acompanhante: 'string',
        areas: 'Area[]',
        armadilhas: 'Armadilhas[]',
        cliente_id: 'string?',
        data: 'date',
        descricao_servicos: 'string?',
        endereco: 'string',
        foto_os: 'string?',
        hora: 'string',
        hora_chegada: 'string?',
        hora_saida: 'string?',
        lat_chegada: 'string?',
        lat_cliente: 'string?',
        lat_saida: 'string?',
        localizacao_detalhada: 'string?',
        nc_previas: 'NC_previas[]',
        nome_cliente: 'string',
        obs_ida: 'string?',
        orcamento_id: 'string?',
        ponto_de_referencia: 'string?',
        produtos: 'Produtos[]',
        revogado: 'string?',
        roteiro_de_servico_id: 'string',
        roteiros_plantas: 'RoteirosPlantas[]',
        roteiros_pragas: 'RoteirosPragas[]',
        sistema_id: 'string',
        status: 'string',
        tel: 'string?',
        tel_1: 'string?',
        tel_2: 'string?',
        user_login: 'string',
        veiculo_id: 'string?',
    },
    primaryKey: 'roteiro_de_servico_id',
}

export const AreaSchema = {
    name: 'Area',
    properties: {
        area_id: 'string',
        desc_area: 'string?',
    },
};

export const ArmadilhasSchema = {
    name: 'Armadilhas',
    properties: {
        QTD_CORPOS: "string?",
        QTD_VIVAS: "string?",
        SLOT1_ACAO: "string?",
        SLOT1_STATUS: "string?",
        SLOT2_ACAO: "string?",
        SLOT2_STATUS: "string?",
        SLOT3_ACAO: "string?",
        SLOT3_STATUS: "string?",
        SLOT4_ACAO: "string?",
        SLOT4_STATUS: "string?",
        SLOT5_ACAO: "string?",
        SLOT5_STATUS: "string?",
        SLOT6_ACAO: "string?",
        SLOT6_STATUS: "string?",
        TIPO_DE_PRAGA_ID:"string?",
        area_id: "string?",
        armadilha_id: "string?",
        codigo_armadilha: "string?",
        complemento_area: "string?",
        desc_armadilha: "string?",
        nome_tipo_de_area: "string?",
        nome_tipo_de_armadilha: "string?",
        numero_armadilha: "string?",
        sigla_armadilha: "string?",
        tipo_de_armadilha_id: "string?"
    },
    primaryKey: 'armadilha_id'
};

export const ProdutosSchema = {
    name: 'Produtos',
    properties: {
        citado_ida: "string",
        nome_prod: "string",
        pragas: "Pragas[]",
        prod_id: "string",
        qtd_prevista: "string",
        roteiro_de_servico_id: "string",
        unidade: "string",
    },
}

export const RoteiroPlantasSchema = {
    name: 'RoteirosPlantas',
    properties: {
        img64: "string?",
        legenda: "string?",
        pavimento: "string?",
        planta_baixa_id: "string",
        quadrante: "string?",
        roteiro_de_servico_id: "string?",
    },
}

export const RoteirosPragas = {
    name: 'RoteirosPragas',
    properties: {
        nome_servico: "string?",
        nome_tipo_de_servico: "string?",
        roteiro_de_servico_id: "string?",
        servico_id: "string?",
        tipo_de_praga: "string?"
    },
}

export const NC_previasSchema = {
    name: 'NC_previas',
    properties: {
        nc_id: "string?",
    },
}