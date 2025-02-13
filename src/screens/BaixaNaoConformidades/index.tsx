import { TouchableOpacity, Text,View, FlatList } from "react-native";
import { Container, Content } from "./styles";
import { HeaderScreen } from "@components/Header";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

const test = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5', 'Teste 6', 'Teste 7']
export function BaixaNaoConformidades() {
    const navigation = useNavigation();

    return ( 
        <Container>
            <HeaderScreen title="Baixa de Não Conformidades" />
            <View style={{justifyContent: 'flex-end', flex: 1}}>
                <FlatList
                    data={test}
                    keyExtractor={item => item}
                    renderItem={ item => (
                        <TouchableOpacity>
                            <Text>
                                {item.item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                <Content type="FOOTER">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={33} color="#ffffff" />
                    </TouchableOpacity>
                </Content>   
            </View>
        </Container>
    )
}