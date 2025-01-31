import {Container, Content, Heading, Row, Cell} from './styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlatList } from 'react-native';

export function DataTable() {
    return (
        <Container>
            <Content>
                <Heading>
                    Não Conformidades
                </Heading>
                <MaterialIcons name="close" size={34} color="red" />
            </Content>
        </Container>
    )
}