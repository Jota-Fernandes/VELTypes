import { createContext, useState, ReactNode, useEffect } from "react";
import AuthApi from "src/services/login/AuthApi";
import { getRealm } from "src/database/realm";
import { AuthSchemaType } from "src/database/schemas/AuthSchema";
import { useNavigation } from "@react-navigation/native";

type User = {
    id: string;
    login: string;
    password: string;
    token?: string;
    replica: string;
    sistema: string;
};

type AuthContextType = {
    user: User;
    setUser: (user: User) => void;
    signed: boolean;
    setSigned: (signed: boolean) => void;
    handleLogin: (login: string, password: string, replica: string) => void;
    login: boolean;
    setLogin: (login: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({ 
    user: { id: "", login: "", password: "", token: "", replica:"", sistema:"" }, 
    setUser: () => {}, 
    signed: false, 
    setSigned: () => {}, 
    handleLogin: () => {},
    login: false,
    setLogin: () => {}
});

type AuthProviderProps = {
    children: ReactNode;
};


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({
        id: "",
        login: "",
        password: "",
        token: "",
        replica: "",
        sistema: ""
    });
    const [signed, setSigned] = useState(false);
    const [login, setLogin] = useState(false)

   

    async function saveDataUser(userData: AuthSchemaType){
        const realm = await getRealm();
        
        if (!realm || realm.isClosed) {
            console.error("Erro: A instância do Realm não foi aberta corretamente.");
            return;
        }

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

            setUser({
                id: userData._id,
                login: userData.login,
                password: userData.password,
                token: userData.token,
                replica: userData.replica,
                sistema: userData.sistema
            })
            setSigned(true)
        } catch(error){
            console.error('saveDataUser: ',error)
        }
    }

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

        } catch(error : any){
            console.error('handleLogin: ', error.response)
            if (error.response?.status) {
                console.log("Entrou no error.response");
                return Promise.reject(error.response.status);
            } else {
                return Promise.reject(new Error("Erro desconhecido no handleLogin")); 
            }
        } 
    }

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                setUser,
                signed,
                setSigned,
                handleLogin,
                login,
                setLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
