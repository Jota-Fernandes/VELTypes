import { Container, Content, Text, Title, SubForm } from "./styles";
import { HeaderScreen } from "@components/Header";
import { PhotoPhorm } from "@components/PhotoPhorm";
import { Button } from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import {useRoute, RouteProp} from "@react-navigation/native"
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { DropdownComponent2 } from "@components/Dropdown2";
import { Input } from "@components/Input";
import { useTranslation } from 'react-i18next';

type DadosServicoRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function DadosServicos() {
    const navigation = useNavigation();
    const route = useRoute<DadosServicoRouteProp>();
    const {roteiro, generalData} = route.params;
    const [veiculos, setVeiculos] = useState<Array<{
        veiculo_id: string;
        desc_veiculo: string;
    }>>([]);
    const {t} = useTranslation();
    const [selectedVeiculo, setSelectedVeiculo] = useState('');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    // Função para formatar a hora no formato HH:MM
    const formatTime = (timeString: string) => {
        const time = new Date(`1970-01-01T${timeString}Z`); // Padrão para parsing da hora
        const hours = String(time.getUTCHours()).padStart(2, '0');
        const minutes = String(time.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };


    const dadosServicos = {
        text: `${roteiro.nome_cliente} 
        \nTelefones: ${roteiro.tel} / ${roteiro.tel_1} / ${roteiro.tel_2}
        \nRoteiro: ${roteiro.roteiro_de_servico_id} - ${formatDate(roteiro.data)} - ${formatTime(roteiro.hora)}
        \n${roteiro.endereco}
        `
    }

    
    function handleGoBack(){
        Alert.alert(t("voltar"), t("m_voltar"), [
            {
                text: t("sim"),
                onPress: () => navigation.goBack()
            },
            {
                text: t("nao"),
                style: 'cancel'
            }
        ])
    }


    useEffect(() => {

        if(generalData){
            const listVeiculos = generalData.Veiculos.map((item: any, index: number) => ({
                veiculo_id: item.veiculo_id,
                desc_veiculo: item.desc_veiculo,
            }));
            setVeiculos([{ veiculo_id: '', desc_veiculo: 'Veículos' }, ...listVeiculos]);
        }
    },[generalData])

    return (
        <Container>
            <HeaderScreen title={t("dados_do_servico")} />

                <Content style={{marginTop: 25}}>
                    <Text>{dadosServicos.text}</Text>
                </Content>

                <Title>Observações</Title>
                <Content>
                    <Text>{roteiro.obs_ida}</Text>
                </Content>
                <Title>Descrição dos Serviços</Title>
                <Content>
                    <Text>{roteiro.descricao_servicos}</Text>
                </Content>
                <DropdownComponent2
                    data={veiculos.map(veiculo => ({ label: veiculo.desc_veiculo, value: veiculo.veiculo_id }))}  
                    label="Veiculos"
                    onSelect={setSelectedVeiculo}
                    value={selectedVeiculo}
                />

                <SubForm>
                    <Input
                        placeholder="Acompanhante"
                    />
                </SubForm>
                <SubForm>
                    <Input
                        placeholder="Observação Volta"
                    />
                </SubForm>

                {/* <PhotoPhorm title="Foto da Ordem de Serviço"/>
                <PhotoPhorm title="Fotos adicionais"/> */}

                <Button 
                    title="Prancheta de Assinatura Digital" 
                    type="TERTIARY"
                    onPress={() => {navigation.navigate('assinatura', {
                        text: "assinatura digital",
                        onOk: "teste",
                    })}}
                />
                <ButtonForm>
                    <Button 
                        title={t("voltar")}
                        type="SECONDARY"
                        onPress={handleGoBack}
                    />
                    <Button 
                        title={t("salvar")}  
                        type="PRIMARY"
                    />
                </ButtonForm>
           
        </Container>
    )
}