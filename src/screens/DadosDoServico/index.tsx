import { Container, Content, Text, Title, SubForm } from "./styles";
import { HeaderScreen } from "@components/Header";
import { PhotoPhorm } from "@components/PhotoPhorm";
import { Button } from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import {useRoute, RouteProp} from "@react-navigation/native"
import { Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { DropdownComponent2 } from "@components/Dropdown2";
import { Input } from "@components/Input";
import { useTranslation } from 'react-i18next';
import { getRealm } from "src/database/realm";

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
    const [selectedVeiculo, setSelectedVeiculo] = useState({
        label: '',
        value: ''
    });
    const [observacao, setObservacao] = useState(''); 
    const [acompanhante, setAcompanhante] = useState(''); 



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

    async function handleSave(roteiroId: any){
        try {
            const realm = await getRealm();

                    
            realm.write(() => {
                const roteiro = realm.objects('Roteiro').filtered('roteiro_de_servico_id == $0', roteiroId.roteiro_de_servico_id);
        
              if (roteiro) {
                roteiroId.acompanhante = acompanhante
                roteiroId.obs_volta = observacao
                roteiroId.veiculo_id = selectedVeiculo.value
              } else {
                console.log('Roteiro não encontrado');
              }
            });
        
          } catch (error) {
            console.error('Erro ao salvar acompanhante e Obs Volta:', error);
          }
    }

    useEffect(() => {

        if(generalData){
            const listVeiculos = generalData.Veiculos.map((item: any, index: number) => ({
                veiculo_id: item.veiculo_id,
                desc_veiculo: item.desc_veiculo,
            }));
            setVeiculos([...listVeiculos]);
        }
    },[generalData])

    useEffect(()=>{
        setAcompanhante(roteiro.acompanhante)
        setObservacao(roteiro.obs_volta)
        
        const veiculoSelecionado = generalData.Veiculos.find(
            (item: any) => item.veiculo_id === roteiro.veiculo_id
        );

        if (veiculoSelecionado) {
            setSelectedVeiculo({ 
                label: veiculoSelecionado?.desc_veiculo ?? '', 
                value: veiculoSelecionado?.veiculo_id ?? ''
            });
        } else {
            setSelectedVeiculo({ label: '', value: '' }); // Caso não encontre o veículo
        }
    },[roteiro])

    return (
        <Container>
            <HeaderScreen title={t("dados_do_servico")} />

                <Content style={{marginTop: 25}}>
                    <Text>{dadosServicos.text}</Text>
                </Content>

                <Title>{t("observacoes")}</Title>
                <Content>
                    <Text>{roteiro.obs_ida}</Text>
                </Content>
                <Title>{t("descricao_servico")}</Title>
                <Content>
                    <Text>{roteiro.descricao_servicos}</Text>
                </Content>
                <DropdownComponent2
                    data={veiculos.map(veiculo => ({ label: veiculo.desc_veiculo, value: veiculo.veiculo_id }))}  
                    label={t("veiculos")}
                    onSelect={(label, value) => setSelectedVeiculo({label, value})}
                    value={selectedVeiculo.label}
                />

                <SubForm>
                    <Input
                        placeholder="Acompanhante"
                        onChangeText={setAcompanhante}
                        value={acompanhante}
                    />
                </SubForm>
                <SubForm style={{height: 100, alignItems: "flex-start" }}>
                     <TextInput
                        style={{ flexWrap: "wrap", height: 100, textAlignVertical: "top", marginTop: 5, marginLeft: 10 }}
                        multiline
                        placeholder="Observação Volta"
                        numberOfLines={5}
                        onChangeText={setObservacao}
                        value={observacao}
                    />
                </SubForm>

                {/* <PhotoPhorm title="Foto da Ordem de Serviço"/>
                <PhotoPhorm title="Fotos adicionais"/> */}

                {/* <Button 
                    title="Prancheta de Assinatura Digital" 
                    type="TERTIARY"
                    onPress={() => {navigation.navigate('assinatura', {
                        text: "assinatura digital",
                        onOk: "teste",
                    })}}
                /> */}
                <ButtonForm style={{alignItems: 'flex-end', flex:1}}>
                    <Button 
                        title={t("voltar")}
                        type="SECONDARY"
                        onPress={handleGoBack}
                    />
                    <Button 
                        title={t("salvar")}  
                        type="PRIMARY"
                        onPress={() => {
                            handleSave(roteiro)
                            navigation.goBack()
                        }}
                    />
                </ButtonForm>
           
        </Container>
    )
}