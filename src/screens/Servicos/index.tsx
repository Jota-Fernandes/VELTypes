import { useContext } from "react";
import { RoteirosContext } from "src/context/RoteirosContext";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import { LoadingModal } from "@components/Loading";
import { ListEmpty } from "@components/ListEmpty";
import { ScreenCard } from "@components/ServiceCard";

import { Container, Title, TextTitle, Icon } from "./styles";


export function Servicos() {
    const {roteiros, generalData, sync} = useContext(RoteirosContext)
    const {t} = useTranslation();
    const navigation = useNavigation();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    // Função para formatar a hora no formato HH:MM
    const formatTime = (timeString: string) => {
        const time = new Date(`1970-01-01T${timeString}Z`); // Padrão para parsing da hora
        const hours = String(time.getUTCHours()).padStart(2, '0');
        const minutes = String(time.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return(
        <Container>
            <Title>
                <Icon name="calendar-month"/>
                <TextTitle>
                {t("servicos agendados")}
                </TextTitle>
            </Title>
            <LoadingModal visible={sync} />
            <FlatList
                data={roteiros.filter(roteiro => roteiro.status === '1')}
                keyExtractor={item => item.roteiro_de_servico_id}
                renderItem={(item) => (
                    <TouchableOpacity onPress={() => navigation.navigate('RoteiroMenu', {roteiro: item.item, generalData})}>
                        <ScreenCard
                            title={`${item.item.roteiro_de_servico_id} - ${item.item.nome_cliente}`}
                            secondTitle={`${formatDate(item.item.data)} - ${formatTime(item.item.hora)}`}
                            subtitle={item.item.endereco}
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                        <ListEmpty message="Não há roteiros"/>
                  
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100, flex: 1 },
                    roteiros.length === 0 && { flex: 1 }
                ]}
            />
        </Container>
    )
}