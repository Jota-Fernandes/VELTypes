import { Container, Content, Text, Title } from "./styles";
import { HeaderScreen } from "@components/Header";
import { DropdownComponent } from "@components/Dropdown";
import { PhotoPhorm } from "@components/PhotoPhorm";
import { Button } from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import {useRoute, RouteProp} from "@react-navigation/native"
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

type DadosServicoRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
]

export function DadosServicos() {
    
    const navigation = useNavigation();
    const route = useRoute<DadosServicoRouteProp>();
    const {roteiro, generalData} = route.params;
    const [veiculos, setVeiculos] = useState<Array<{
        veiculo_id: string;
        desc_veiculo: string;
    }>>([]);

    const dadosServicos = {
        text: `${roteiro.nome_cliente} 
        \nTelefones: ${roteiro.tel} / ${roteiro.tel_1} / ${roteiro.tel_2}
        \nRoteiro: ${roteiro.roteiro_de_servico_id} - ${roteiro.data} - ${roteiro.hora}
        \n${roteiro.endereco}
        `
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
            <HeaderScreen title="Dados dos Serviços" />
            <ScrollView>
                <Content>
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
                <DropdownComponent 
                    data={veiculos.map(veiculo => ({ label: veiculo.desc_veiculo, value: veiculo.veiculo_id }))}  
                    label="Veiculos"/>

                <PhotoPhorm title="Foto da Ordem de Serviço"/>
                <PhotoPhorm title="Fotos adicionais"/>

                <Button 
                    title="Prancheta de Assinatura Digital" 
                    type="TERTIARY"
                />
                <ButtonForm>
                    <Button 
                        title="Voltar" 
                        type="SECONDARY"
                        onPress={() => navigation.goBack()}
                    />
                    <Button 
                        title="Salvar" 
                        type="PRIMARY"
                    />
                </ButtonForm>
            </ScrollView>
        </Container>
    )
}