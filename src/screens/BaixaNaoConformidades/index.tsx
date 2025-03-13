import { TouchableOpacity, Text, View, FlatList } from "react-native";
import { Container, Content } from "./styles";
import { HeaderScreen } from "@components/Header";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button";
import { useState } from "react";

const test = ['Teste 1'];

export function BaixaNaoConformidades() {
    const navigation = useNavigation();
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

    const toggleItem = (item: string) => {
        setOpenItems(prevState => ({
            ...prevState,
            [item]: !prevState[item] // Alterna apenas o item selecionado
        }));
    };

    return ( 
        <Container>
            <HeaderScreen title="Baixa de Não Conformidades" />
            <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                <FlatList
                    data={test}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <View>      
                            <TouchableOpacity onPress={() => toggleItem(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                            {openItems[item] && ( // Verifica se o item específico está aberto
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <Button
                                        title="Baixar"
                                        type="PRIMARY"
                                        style={{ width: '50%' }}
                                    />
                                </View>
                            )}
                        </View>
                    )}
                />
                <Content type="FOOTER">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={33} color="#ffffff" />
                    </TouchableOpacity>
                </Content>   
            </View>
        </Container>
    );
}
