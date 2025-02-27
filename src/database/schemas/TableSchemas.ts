import Realm from "realm";

export class NaoConformidade extends Realm.Object<NaoConformidade> {
  id!: string;
  roteiro_id!: string;
  area!: string;
  area_id!: string;
  nc!: string;
  registrada!: string;
  responsavel!: string;
  medidasCorretivas!: string;
  prazo!: string;

  static schema: Realm.ObjectSchema = {
    name: "NaoConformidade",
    properties: {
        id: "string",
        roteiro_id: "string",
        area: "string",
        area_id: "string",
        naoConformidade: "string",
        naoConformidade_id: "string",
        registrada: "string",
        registrada_id: "string",
        responsavel: "string",
        medidasCorretivas: "string",
        medidasCorretivas_id: "string",
        prazo: "string",
        prazo_id: "string"
    },
  };
}

export class Ocorrencias extends Realm.Object<Ocorrencias> {
  id!: string;
  roteiro_id!: string;
  area!: string;
  ocorrencias!: string;
  data!: string;
  hroa!: string;

  static schema: Realm.ObjectSchema = {
    name: "OcorrenciasTable",
    properties: {
        id: "string",
        roteiro_id: "string",
        area: "string",
        ocorrencia: "string",
        data: "string",
        hora: "string",
    },
  };
}

export class ProdutosPorArea extends Realm.Object<ProdutosPorArea> {
  id!: string;
  roteiro_id!: string;
  area!: string;
  produto!: string;
  qtd!: string;
  equipto!: string;

  static schema: Realm.ObjectSchema = {
    name: "ProdutosPorAreaTable",
    properties: {
        id: "string",
        roteiro_id: "string",
        area: "string",
        produto: "string",
        qtd: "string",
        equipto: "string",
        praga: "string",
    },
  };
}