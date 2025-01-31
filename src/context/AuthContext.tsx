import { createContext, useState, ReactNode, useEffect } from "react";
import AuthApi from "src/services/login/AuthApi";
import { getRealm } from "src/database/realm";
import { AuthSchemaType } from "src/database/schemas/AuthSchema";

type User = {
    id: string;
    login: string;
    password: string;
    token?: string;
};

type AuthContextType = {
    user: User;
    setUser: (user: User) => void;
    signed: boolean;
    setSigned: (signed: boolean) => void;
    handleLogin: (login: string, password: string, replica: string) => void;
};

// Definindo o contexto corretamente
export const AuthContext = createContext<AuthContextType>({ 
    user: { id: "", login: "", password: "", token: "" }, 
    setUser: () => {}, 
    signed: false, 
    setSigned: () => {}, 
    handleLogin: () => {} 
});

type AuthProviderProps = {
    children: ReactNode;
};


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({
        id: "",
        login: "",
        password: "",
        token: ""
    });
    const [signed, setSigned] = useState(false);

//Sincronizar os dados do banco
    async function fetchUsers() {
        const realm = await getRealm()
        try{
            const response = realm.objects('Auth')
            
            if(response.length > 0){
                setSigned(true)
            }
        } catch(error){
            console.error('fetchUsers', error)
        } finally{
            realm.close()
        }
    }

//Salva os dados de login no banco
    async function saveDataUser(userData: AuthSchemaType){
        const realm = await getRealm();

        try{
            realm.write(() =>{
                realm.create('Auth', {
                    _id: userData._id,
                    login: userData.login,
                    password: userData.password,
                    replica: userData.replica,
                    token: userData.token,
                    sistema: userData.sistema
                });
            })
            
        } catch(error){
            console.error('saveDataUser: ',error)
        } finally{
            realm.close()
        }
    }

//Lida com o login e salva os dados no banco   
    async function handleLogin(login: string, password: string, replica: string) {
        const apiAuth = new AuthApi(replica)

        try{
            const response = await apiAuth.get(login, password, replica)
            
            await saveDataUser({
                _id: response.data.user_id,
                login: login,
                password: password,
                replica: replica,
                token: response.data.token,
                sistema: response.data.sistema_id
            });

            setSigned(true)

        } catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                setUser,
                signed,
                setSigned,
                handleLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
