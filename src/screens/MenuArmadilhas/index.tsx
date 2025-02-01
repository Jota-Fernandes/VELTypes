import { FlatList, TouchableOpacity } from "react-native";
import {MaterialIcons} from '@expo/vector-icons' 
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import uuid from 'react-native-uuid'

import { HeaderScreen } from "@components/Header";

import { Container, Content, Heading, Row, Cell } from "./styles";
import { useEffect, useState } from "react";

type MenuArmadilhaRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function MenuArmadilhas() {
    const route = useRoute<MenuArmadilhaRouteProp>();
    const {roteiro} = route.params;
    const navigation = useNavigation();
    
    const [armadilhas, setArmadilhas] = 
        useState<Array<{
            numero_armadilha: string; 
            tipo_armadilha: string; 
            local: string, 
            armadilha_id: string 
        }>>([]);
    
    useEffect(() => {
        if (roteiro && roteiro.armadilhas) {

            // Mapear os dados das armadilhas para o formato do FlatList
            const listaArmadilhas = roteiro.armadilhas.map((item: any, index: number) => ({
                numero_armadilha: item.numero_armadilha, 
                tipo_armadilha: item.nome_tipo_de_armadilha, 
                local: item.desc_armadilha,
                id: uuid.v4() as string
            }));

            setArmadilhas(listaArmadilhas);
        }
    }, [roteiro]);

    return(
        <Container>
            <HeaderScreen title="Armadilhas" />
            <Content type="HEADER">
                <Heading>Nº</Heading>
                <Heading>Código</Heading>
                <Heading>Local</Heading>
            </Content>
            <FlatList
                data={armadilhas}
                keyExtractor={(item) => item.armadilha_id} 
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Armadilha')}>
                        <Row>
                            <Cell style={{width: '30%'}}>{item.numero_armadilha}</Cell>
                            <Cell style={{width: '35%'}}>{item.tipo_armadilha}</Cell>
                            <Cell style={{width: '35%'}}>{item.local}</Cell>
                        </Row>
                    </TouchableOpacity>
                )}
                />
            <Content type="FOOTER">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={33} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="map" size={33} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="qr-code-scanner" size={33} color="#ffffff" />
                </TouchableOpacity>
            </Content>
        </Container>
    )
}