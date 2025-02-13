import { HeaderScreen } from "@components/Header";
import { Container , HeaderTable, TitleHeader, Cell, Row} from "./styles";
import { getRealm } from "src/database/realm";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button";

type DadosReviewRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function DadosReview(){

    const route = useRoute<DadosReviewRouteProp>();
    const {roteiro, generalData} = route.params;
    const [renderedItems, setRenderedItems] = useState<any[]>([]);
    const navigation = useNavigation();

    function renderNaoConformidade(novaNaoConformidade: any) {
        return (
            <ScrollView horizontal={true} key={novaNaoConformidade.id}>
                <Row>
                    <Cell>{novaNaoConformidade.area}</Cell>
                    <Cell>{novaNaoConformidade.nc}</Cell>
                    <Cell>{novaNaoConformidade.registrada}</Cell>
                    <Cell>{novaNaoConformidade.responsavel}</Cell>
                    <Cell>{novaNaoConformidade.medidasCorretivas}</Cell>
                    <Cell>{novaNaoConformidade.prazo}</Cell>
                </Row>
            </ScrollView>
        );
    }

    async function finishService(){
        try{
            const realm = await getRealm();
            console.log('id', roteiro.roteiro_de_servico_id);
            realm.write(() => {
                let roteiroToFinish = realm.objectForPrimaryKey('Roteiro', roteiro.roteiro_de_servico_id);

                if (roteiroToFinish) {
                    roteiroToFinish.status = "2";
                } else {
                    console.warn("Roteiro não encontrado");
                }
            });

        } catch (error) {
            console.error('Request finish service ==> ', error)
        }

        navigation.navigate("Servicos");
    }

    useEffect(() => {
        async function loadNaoConformidades() {
            try {
                const realm = await getRealm();
                const storedNaoConformidades = realm.objects("NaoConformidade").filtered(`roteiro_id == '${roteiro.roteiro_de_servico_id}'`);

                const loadedItems = storedNaoConformidades.map((item: any) => ({
                    id: item.id,
                    area: item.area,
                    naoConformidade: item.naoConformidade,
                    registrada: item.registrada,
                    responsavel: item.responsavel,
                    medidasCorretivas: item.medidasCorretivas,
                    prazo: item.prazo,
                }));

                setRenderedItems(loadedItems.map(renderNaoConformidade));
                
            } catch (error) {
                console.error("Erro ao carregar dados do banco:", error);
            }
        }

        loadNaoConformidades();
    },[])

    return (
        <Container>
            <HeaderScreen title="Dados Review" />
            <HeaderTable>
                <TitleHeader>Não Conformidades</TitleHeader>
            </HeaderTable>
            {renderedItems}
            <Button 
                title="Finalizar serviço" 
                type="TERTIARY"
                onPress={finishService}
            />
        </Container>
    )
}