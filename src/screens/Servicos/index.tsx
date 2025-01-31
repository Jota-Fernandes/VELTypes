import { useState, useContext, useCallback } from "react";
import { RoteirosContext } from "src/context/RoteirosContext";
import { FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';

import { ListEmpty } from "@components/ListEmpty";
import { ScreenCard } from "@components/ServiceCard";

import { Container, Title, TextTitle, Icon } from "./styles";


export function Servicos() {
    const {roteiros, loadRoteiros} = useContext(RoteirosContext)

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
                data={roteiros}
                keyExtractor={item => item.roteiro_de_servico_id}
                renderItem={(item) => (
                    <TouchableOpacity onPress={() => navigation.navigate('RoteiroMenu', {roteiro: item.item})}>
                        <ScreenCard
                            title={item.item.nome_cliente}
                            subtitle={item.item.endereco}
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <ListEmpty message="Não há roteiros"/>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    roteiros.length === 0 && { flex: 1 }
                ]}
            />
        </Container>
    )
}