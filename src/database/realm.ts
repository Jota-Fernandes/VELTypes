import Realm from 'realm';
import { AuthSchema } from './schemas/AuthSchema';

export const getRealm = async() => await Realm.open({
    path: "auth",
    schema: [AuthSchema]
})