import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { Input } from "@components/Input";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PhotoPhorm } from "@components/PhotoPhorm";
import {Button} from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import { DropdownComponent2 } from "@components/Dropdown2";
import { Container, TitleHeader, Title, SubForm } from "./styles";
import { RouteProp } from "@react-navigation/native";


type ArmadilhaRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function Armadilha(){
    const route = useRoute<ArmadilhaRouteProp>();
    const {roteiro, armadilha, generalData} = route.params;
    const [produtos, setProdutos] = 
        useState<Array<{
            nome_prod: string; 
            prod_id: string;
        }>>([]);
    const [selectedProdutos, setSelectedProdutos] = useState('');
    const [elementos, setElementos] = useState<Array<{ nome: string; acao: string | null; status: string | null }>>([]);
    const [selectedStatus, setSelectedStatus] = useState('')
    const [selectedAcao, setSelectedAcao] = useState('')
    const [selectedOco, setSelectedOco] = useState('')
    const [statusList, setStatusList] = useState<Array<{ label: string; value: string }>>([]);
    const [acaoList, setAcaoList] = useState<Array<{ label: string; value: string }>>([]);
    const [ocorreciaList, setOcorreciaList] = useState<Array<{ label: string; value: string }>>([]);

    const navigation = useNavigation();

    useEffect(() => {
        if (roteiro) {
            const listProdutos = roteiro.produtos.map((item: any, index: number) => ({
                prod_id: item.prod_id,
                nome_prod: item.nome_prod,
            }));

            setProdutos([{ prod_id: '', nome_prod: 'Produtos' }, ...listProdutos]);
        }
    }, [roteiro]);

    useEffect(() => {
        const armadilhaData = generalData.TiposArm.find(tipo => tipo.tipo_id === armadilha.tipo_de_armadilha_id);
    
        if (armadilhaData) {
            const elementosPreenchidos = Object.entries(armadilhaData)
                .slice(3, 9) // Pegando apenas elem1 a elem6
                .filter(([_, value]) => value !== "") // Remove os vazios
                .map(([key, value], index) => ({
                    nome: value as string,
                    acao: armadilha[`SLOT${index + 1}_ACAO`] || null, // Evita undefined
                    status: armadilha[`SLOT${index + 1}_STATUS`] || null // Evita undefined
                }));
    
            setElementos(elementosPreenchidos);
        }
    
        // Garante que apenas strings válidas sejam armazenadas no estado
        if (generalData.StatusArm) {
            const statusListExtracted = generalData.StatusArm
                .map(status => ({
                    label: status.desc_status ?? "", // Garante que label seja uma string
                    value: status.status_id ?? ""   // Garante que value seja uma string
                }))
                .filter(item => item.label !== "" && item.value !== ""); // Remove itens inválidos
    
            setStatusList(statusListExtracted);
        }

        if (generalData.AcaoArm) {
            const acaoListExtracted = generalData.AcaoArm
                .map(status => ({
                    label: status.desc_acao ?? "",
                    value: status.acao_id ?? ""
                }))
                .filter(item => item.label !== "" && item.value !== ""); // Remove itens inválidos
    
            setAcaoList(acaoListExtracted);
        }

        if (generalData.Ocorrencias) {
            const ocorrenciaListExtracted = generalData.Ocorrencias
                .map(status => ({
                    label: status.desc_oco ?? "",
                    value: status.oco_id ?? ""
                }))
                .filter(item => item.label !== "" && item.value !== ""); // Remove itens inválidos
    
            setOcorreciaList(ocorrenciaListExtracted);
        }
    
    }, [armadilha, generalData]);

    return(
        <Container>
                <Text style={{marginTop: 20, marginLeft: 20, fontSize: 18}}>
                        Armadilhas Nº {armadilha.numero_armadilha}
                </Text>
                <Text style={{ marginLeft: 20, fontSize: 18}}>
                    {armadilha.tipo_armadilha }
                </Text>
                <Text style={{ marginLeft: 20, fontSize: 18, marginBottom: 10}}>
                    Setor: {armadilha.local}
                </Text>
                {elementos.length > 0 && (
                    <>
                        {elementos.map((elem, index) => (
                            <View>
                                <TitleHeader key={index}>                           
                                    <Title>{elem.nome}</Title>
                                </TitleHeader>
                                <DropdownComponent2
                                    data={statusList}
                                    label="Status"
                                    onSelect={setSelectedStatus}
                                    value={selectedStatus}
                                />
                                <DropdownComponent2
                                    data={acaoList}
                                    label="Ação"
                                    onSelect={setSelectedAcao}
                                    value={selectedAcao}
                                />
                            </View>
                        ))}
                    </>
                )}
                <TitleHeader>
                    <Title>Produtos</Title>
                </TitleHeader>
                <DropdownComponent2 
                    data={produtos.map(produto => ({ label: produto.nome_prod, value: produto.prod_id }))} 
                    label="Produtos"
                    onSelect={setSelectedProdutos}
                    value={selectedProdutos}
                />
                <SubForm style={{marginBottom: 10}}>
                    <Input
                        placeholder="Quantidade"
                        type="text"
                    />
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <MaterialIcons name="add-circle" size={24} color="green" />
                    </TouchableOpacity>
                </SubForm>
                <TitleHeader>
                    <Title>Ocorrências</Title>
                </TitleHeader>
                <DropdownComponent2 
                    data={ocorreciaList}
                    label="Ocorrências"
                    onSelect={setSelectedOco}
                    value={selectedOco}
                />
                <SubForm>
                    <Input
                        placeholder="Vivas"
                    />
                    <Input
                        placeholder="Mortas"
                    />
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <MaterialIcons name="add-circle" size={24} color="green" />
                    </TouchableOpacity>
                </SubForm>
                <PhotoPhorm 
                    title="Fotos das Armadilhas"
                />
                <ButtonForm>
                    <Button
                        onPress={() => navigation.goBack() }
                        title="Voltar"
                        type="SECONDARY"
                    />
                    <Button
                        title="Salvar"
                        type="PRIMARY"
                    />
                </ButtonForm>
        </Container>
    )
}