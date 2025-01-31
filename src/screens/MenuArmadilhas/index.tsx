import { FlatList, TouchableOpacity } from "react-native";
import {MaterialIcons} from '@expo/vector-icons' 
import { useNavigation } from "@react-navigation/native";

import { HeaderScreen } from "@components/Header";

import { Container, Content, Heading, Row, Cell } from "./styles";

export function MenuArmadilhas() {

    const navigation = useNavigation();

    return(
        <Container>
            <HeaderScreen title="Armadilhas" />
            <Content type="HEADER">
                <Heading>Nº</Heading>
                <Heading>Código</Heading>
                <Heading>Local</Heading>
            </Content>
            <FlatList
                data={[
                    {key: '1', name: 'PIP ', local: 'Local 1'},
                    {key: '2', name: 'ARAN', local: 'Local 2'},
                    {key: '3', name: 'PAL', local: 'Local 3'},
                    {key: '4', name: 'ESP', local: 'Local 4'},
                ]}
                keyExtractor={(item) => item.key} 
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Armadilha')}>
                        <Row>
                            <Cell style={{width: '30%'}}>{item.key}</Cell>
                            <Cell style={{width: '35%'}}>{item.name}</Cell>
                            <Cell style={{width: '35%'}}>{item.local}</Cell>
                        </Row>
                    </TouchableOpacity>
                )}
                />
            <Content type="FOOTER">
                <MaterialIcons name="arrow-back" size={33} color="#ffffff" />
                <MaterialIcons name="map" size={33} color="#ffffff" />
                <MaterialIcons name="qr-code-scanner" size={33} color="#ffffff" />
            </Content>
        </Container>
    )
}