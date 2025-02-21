import { Container } from "./styles";
import { HeaderScreen } from "@components/Header";
import { useContext, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ScreenCard } from "@components/ServiceCard";
import { ListEmpty } from "@components/ListEmpty";
import { RoteirosContext } from "src/context/RoteirosContext";

export function ServicosExecutados() {
    const {roteiros} = useContext(RoteirosContext)
    const data = []

    return (
        <Container>
            <FlatList
                data={roteiros.filter(roteiro => roteiro.status === '2')}
                keyExtractor={item => item.roteiro_de_servico_id}
                renderItem={(item) => (
                    <TouchableOpacity>
                        <ScreenCard
                            title={item.item.nome_cliente}
                            subtitle={item.item.endereco}
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <ListEmpty
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        message="Não há roteiros"
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100, flex: 1 },
                    roteiros.length === 0 && { flex: 1 },
                ]}
            />
        </Container>
    )
}