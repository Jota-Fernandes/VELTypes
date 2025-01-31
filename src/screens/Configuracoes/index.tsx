import { useState } from "react";
import { Container } from "./styles";
import { useTranslation } from 'react-i18next';

import { Text, Pressable } from 'react-native';
import { SubForm, Form } from "@screens/Login/styles";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Configuracoes() {
    const { t, i18n } = useTranslation();             
    const [currentLanguage, setLanguage] = useState('ptbr');

    const changeLanguage = (value : string) => {
    i18n
    .changeLanguage(value)
    .then(() => setLanguage(value))
    .catch(err => console.log(err));
    }
    
    return (
        <Container>
            <Form>
                <SubForm>
                <Input placeholder="Login" autocapitalize="none"/>
                </SubForm>

                <SubForm>
                <Input 
                    placeholder={t('senha')}
                    />
                </SubForm>

                <SubForm>
                <Input placeholder="Réplica" autocapitalize="none"/>
                </SubForm>
                
                <Button title={t("salvar_configuracoes")}/>
            </Form>
 
 
            <Pressable
                onPress={() => changeLanguage('ptbr')}
                style={{
                backgroundColor:
                    currentLanguage === 'ptbr' ? '#33A850' : '#d3d3d3',
                padding: 20,
                }}>
                <Text>Selecione português</Text>
            </Pressable>
            <Pressable
                onPress={() => changeLanguage('es')}
                style={{
                backgroundColor:
                    currentLanguage === 'es' ? '#33A850' : '#d3d3d3',
                padding: 20,
                }}>
                <Text>Selecione espanhol</Text>
            </Pressable>
        </Container>
    )
}