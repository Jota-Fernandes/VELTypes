import {Container, Content, Heading} from './styles';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
    title: string;
    onPress?: () => void; // Adicionando onPress como opcional
}

export function DataTable({ title, onPress, ...rest }: Props) {
    return (
        <Container>
            <Content>
                <Heading>
                    {title}
                </Heading>
                <TouchableOpacity onPress={onPress} {...rest}>
                    <MaterialIcons name="close" size={34} color="red" />
                </TouchableOpacity>
            </Content>
        </Container>
    )
}