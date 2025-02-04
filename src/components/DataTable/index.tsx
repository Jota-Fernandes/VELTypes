import {Container, Content, Heading} from './styles';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function DataTable({...rest}) {

    return (
        <Container>
            <Content>
                <Heading>
                    Não Conformidades
                </Heading>
                <TouchableOpacity {...rest}>
                    <MaterialIcons name="close" size={34} color="red" />
                </TouchableOpacity>
            </Content>

        </Container>
    )
}