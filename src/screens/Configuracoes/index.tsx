import { useContext, useState } from "react";
import { Container, LanguageContainer } from "./styles";
import { useTranslation } from 'react-i18next';
import { AuthContext } from "src/context/AuthContext";
import { Text, Pressable, Alert } from 'react-native';
import { SubForm, Form } from "@screens/Login/styles";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Configuracoes() {
    const { t, i18n } = useTranslation();             
    const [currentLanguage, setLanguage] = useState('ptbr');
    const {user} = useContext(AuthContext)

    const changeLanguage = (value : string) => {
    i18n
    .changeLanguage(value)
    .then(() => setLanguage(value))
    .catch(err => console.log(err));
    }

    function aviso(){
        Alert.alert('Alerta','Aún en desarrollo');
    }
    
    return (
        <Container>
            <Form>
                <SubForm>
                <Input 
                    placeholder="Login" 
                    autocapitalize="none"
                    value={user.login}
                />
                </SubForm>

                <SubForm>
                <Input 
                    placeholder={t('senha')}
                    value={user.password}
                    secureTextEntry={true}
                />
                </SubForm>

                <SubForm>
                <Input 
                    placeholder="Réplica" 
                    autocapitalize="none"
                    value={user.replica}
                    />
                </SubForm>
                
                <Button 
                    onPress={()=> aviso()}
                    title={t("salvar_configuracoes")}
                />
            </Form>
 
            <LanguageContainer style={{marginBottom: 20}}>
                <Pressable
                    onPress={() => changeLanguage('ptbr')}
                    style={{
                    backgroundColor:
                        currentLanguage === 'ptbr' ? '#33A850' : '#d3d3d3',
                    padding: 20,
                    borderRadius: 10
                    }}>
                    <Text>Mudar idioma para português</Text>
                </Pressable>
                <Pressable
                    onPress={() => changeLanguage('es')}
                    style={{
                    backgroundColor:
                        currentLanguage === 'es' ? '#33A850' : '#d3d3d3',
                    padding: 20,
                    borderRadius: 10
                    }}>
                    <Text>Cambiar idioma a español</Text>
                </Pressable>
            </LanguageContainer>
        </Container>
    )
}