import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';

import { ListEmpty } from "@components/ListEmpty";
import { ScreenCard } from "@components/ServiceCard";

import { Container, Title, TextTitle, Icon } from "./styles";

export function Servicos() {
    const [roteiro, setRoteiro] = useState(['teste', 'teste2', 'teste3' ]);

    const {t} = useTranslation();

    const navigation = useNavigation();

    return(
        <Container>
            <Title>
                <Icon name="calendar-month"/>
                <TextTitle>
                {t("servicos agendados")}
                </TextTitle>
            </Title>
            <FlatList
                data={roteiro}
                keyExtractor={item => item}
                renderItem={(item) => (
                    <TouchableOpacity onPress={() => navigation.navigate('RoteiroMenu')}>
                        <ScreenCard
                            title="55 - VLI TIPLAM"
                            subtitle="RODOVIA CONEGO DOMENICO RANGONI"
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <ListEmpty message="Não há roteiros"/>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    roteiro.length === 0 && { flex: 1 }
                ]}
            />
        </Container>
    )
}