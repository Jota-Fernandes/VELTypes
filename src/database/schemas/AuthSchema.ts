export type AuthSchemaType = {
    _id: string;
    login: string;
    password: string;
    replica: string;
    token: string;
    sistema: string;
};

export const AuthSchema = {
    name: "Auth",

    properties:{
        _id: 'string',
        login: "string",
        password: "string",
        replica: "string",
        token: "string",
        sistema: "string"
    },

    primaryKey: "_id"
}