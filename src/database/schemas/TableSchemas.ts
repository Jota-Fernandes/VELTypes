import Realm from "realm";

export class NaoConformidade extends Realm.Object<NaoConformidade> {
  id!: string;
  area!: string;
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
        naoConformidade: "string",
        registrada: "string",
        responsavel: "string",
        medidasCorretivas: "string",
        prazo: "string",
    },
  };
}
