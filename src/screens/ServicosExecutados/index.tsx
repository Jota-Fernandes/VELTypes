import { Container } from "./styles";
import { useContext, useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { ScreenCard } from "@components/ServiceCard";
import { ListEmpty } from "@components/ListEmpty";
import { RoteirosContext } from "src/context/RoteirosContext";
import { useTranslation } from 'react-i18next';
import { getRealm } from "src/database/realm";
import { Button } from "@components/Button";

import { RoteiroSchemaType } from "src/database/schemas/RoteiroSchema";
export function ServicosExecutados() {
    const {roteiros, setRoteiros} = useContext(RoteirosContext)
    const {t} = useTranslation();
    const [roteiroFiltered, setRoteiroFiltered] = useState<RoteiroSchemaType[]>([])

    async function handleDeleteRoteirosWithStatus3() {
        
        try{
            
            setRoteiros(prevRoteiros => prevRoteiros.filter(roteiro => roteiro.status !== '3'));
            setRoteiroFiltered(prevRoteiros => prevRoteiros.filter(roteiro => roteiro.status !== '3'))

            const realm = await getRealm();
            realm.write(() => {
                const roteirosToDelete = realm.objects('Roteiro').filtered('status == "3"');
                realm.delete(roteirosToDelete);
            });
        } catch (error){
            console.error(error)
        }
    }


    useEffect(() => {
        const roteirosFiltrado = roteiros.filter(roteiro => roteiro.status === '2' || roteiro.status === '3')
        setRoteiroFiltered(roteirosFiltrado)
    }, [])
    return (
        <Container>
            <FlatList
                data={roteiroFiltered}
                keyExtractor={item => item.roteiro_de_servico_id}
                renderItem={(item) => (
                    <View>
                        <ScreenCard
                            title={`${item.item.roteiro_de_servico_id} ${item.item.nome_cliente}`}
                            secondTitle={ item.item.status === '2' ? "Executado" : "Sincronizado"}
                        />
                    </View>
                )}
                ListEmptyComponent={
                    <ListEmpty
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        message={t("nao_roteiros")}
                    />
                }
                contentContainerStyle={[
                    { paddingBottom: 100, flex: 1 },
                    roteiros.length === 0 && { flex: 1 },
                ]}
            />
            <Button 
                title="Deletar serviços sincronizados"
                type="SECONDARY"
                onPress={handleDeleteRoteirosWithStatus3}
            >
            </Button>
        </Container>
    )
}