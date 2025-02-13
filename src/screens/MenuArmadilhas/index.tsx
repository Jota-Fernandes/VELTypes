import { FlatList, TouchableOpacity, TextInput } from "react-native";
import {MaterialIcons} from '@expo/vector-icons' 
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import uuid from 'react-native-uuid'

import { HeaderScreen } from "@components/Header";

import { Container, Content, Heading, Row, Cell } from "./styles";
import { useEffect, useState } from "react";

type MenuArmadilhaRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function MenuArmadilhas() {
    const route = useRoute<MenuArmadilhaRouteProp>();
    const {roteiro, generalData} = route.params;
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    
    const [armadilhas, setArmadilhas] = 
        useState<Array<{
            numero_armadilha: string; 
            tipo_armadilha: string; 
            local: string, 
            armadilha_id: string;
            tipo_de_armadilha_id: string;
            QTD_CORPOS?: number,
            QTD_VIVAS?: number,
            SLOT1_ACAO?: string,
            SLOT1_STATUS?: string,
            SLOT2_ACAO?: string,
            SLOT2_STATUS?: string,
            SLOT3_ACAO?: string,
            SLOT3_STATUS?: string,
            SLOT4_ACAO?: string,                    
            SLOT4_STATUS?: string,
            SLOT5_ACAO?: string,                
            SLOT5_STATUS?: string,
            SLOT6_ACAO?: string,                
            SLOT6_STATUS?: string,
            TIPO_DE_PRAGA_ID?: string,
            area_id?: string,
            codigo_armadilha?: string,
            complemento_area?: string,
            desc_armadilha?: string,
            nome_tipo_de_area?: string,
            nome_tipo_de_armadilha?: string,
        }>>([]);

    const filteredArmadilhas = armadilhas.filter(item =>
        item.numero_armadilha.includes(searchQuery) ||
        item.tipo_armadilha.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.local.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    useEffect(() => {
        if (roteiro && roteiro.armadilhas) {
            const listaArmadilhas = roteiro.armadilhas
                .map((item: any) => ({
                    numero_armadilha: item.numero_armadilha, 
                    tipo_armadilha: item.nome_tipo_de_armadilha, 
                    local: item.nome_tipo_de_area,
                    armadilha_id: uuid.v4() as string,
                    tipo_de_armadilha_id: item.tipo_de_armadilha_id,
                    QTD_CORPOS: item.QTD_CORPOS,
                    QTD_VIVAS: item.QTD_VIVAS,
                    SLOT1_ACAO: item.SLOT1_ACAO,
                    SLOT1_STATUS: item.SLOT1_STATUS,
                    SLOT2_ACAO: item.SLOT2_ACAO,
                    SLOT2_STATUS: item.SLOT2_STATUS,
                    SLOT3_ACAO: item.SLOT3_ACAO,
                    SLOT3_STATUS: item.SLOT3_STATUS,
                    SLOT4_ACAO: item.SLOT4_ACAO,                    
                    SLOT4_STATUS: item.SLOT4_STATUS,
                    SLOT5_ACAO: item.SLOT5_ACAO,                
                    SLOT5_STATUS: item.SLOT5_STATUS,
                    SLOT6_ACAO: item.SLOT6_ACAO,                
                    SLOT6_STATUS: item.SLOT6_STATUS,
                    TIPO_DE_PRAGA_ID: item.TIPO_DE_PRAGA_ID,
                    area_id: item.area_id,
                    codigo_armadilha: item.codigo_armadilha,
                    complemento_area: item.complemento_area,
                    desc_armadilha: item.desc_armadilha,
                    nome_tipo_de_area: item.nome_tipo_de_area,
                    nome_tipo_de_armadilha: item.nome_tipo_de_armadilha,
                    sigla_armadilha: item.sigla_armadilha,
                }))
                .sort((a: any, b: any) => Number(a.numero_armadilha) - Number(b.numero_armadilha)); // Ordenação crescente

            setArmadilhas(listaArmadilhas);
        }
    }, [roteiro]);

    return(
        <Container>
            <HeaderScreen title="Armadilhas" />
            <TextInput
                placeholder="Buscar armadilha..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ padding: 10, backgroundColor: '#fff', borderRadius: 8 }}
            />
            <Content type="HEADER">
                <Heading>Nº</Heading>
                <Heading>Código</Heading>
                <Heading>Local</Heading>
            </Content>
            <FlatList
                data={filteredArmadilhas}
                keyExtractor={(item) => item.armadilha_id} 
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Armadilha', {roteiro, armadilha: item, generalData})}>
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