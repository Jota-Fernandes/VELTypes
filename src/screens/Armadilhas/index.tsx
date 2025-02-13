import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Input } from "@components/Input";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PhotoPhorm } from "@components/PhotoPhorm";
import {Button} from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import { DropdownComponent2 } from "@components/Dropdown2";
import { Container, Heading, TitleHeader, Title, SubForm } from "./styles";
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
    const [elementos, setElementos] = useState<string[]>([]);

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

        console.log('armadilha: ', armadilhaData);
        
        if (armadilhaData) {
            // Filtra apenas os elementos preenchidos
            const elementosPreenchidos = Object.values(armadilhaData)
                .slice(3, 9) // Pega apenas os elementos elem1 a elem6
                .filter(elem => elem !== ""); // Remove os vazios
            
            setElementos(elementosPreenchidos);
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
                            <TitleHeader>                           
                                <Title key={index}>
                                    {elem}
                                </Title>
                            </TitleHeader>
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
                <SubForm>
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
              {/*   <DropdownComponent2 
                    data={data}
                    label="Ocorrências"
                /> */}
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