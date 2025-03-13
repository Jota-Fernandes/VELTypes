import { HeaderScreen } from "@components/Header";
import { Container , HeaderTable, TitleHeader, Cell, Row, NumbersOfRow} from "./styles";
import { getRealm } from "src/database/realm";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button";
import { useTranslation } from 'react-i18next';
import { ButtonForm } from "@components/Button/styles";

type DadosReviewRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function DadosReview(){

    const route = useRoute<DadosReviewRouteProp>();
    const {roteiro, generalData} = route.params;
    const [renderedItems, setRenderedItems] = useState<any[]>([]);
    const [prodRenderedItems,setProdRenderedItems] = useState<any[]>([]);
    const [ocoRenderedItems,setOcoRenderedItems] = useState<any[]>([]);
    
    const navigation = useNavigation();
    const {t} = useTranslation();

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

        function renderOcorrencia(novaOcorrencia: any) {
            return (
                <ScrollView horizontal={true} key={novaOcorrencia.id}>
                    <Row>
                        <Cell>{novaOcorrencia.area}</Cell>
                        <Cell>{novaOcorrencia.ocorrencia}</Cell>
                        <Cell>{novaOcorrencia.data}</Cell>
                        <Cell style={{width: 100}}>{novaOcorrencia.hora}</Cell>
                    </Row>
                </ScrollView>
            );
        }

    async function finishService(){
        try{
            const realm = await getRealm();
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

        function renderProdAreas(novaProdAreas: any) {
            
            return (
                <ScrollView horizontal={true} key={novaProdAreas.id}>
                    <Row>
                        <Cell>{novaProdAreas.area}</Cell>
                        <Cell>{novaProdAreas.produto}</Cell>
                        <Cell>{novaProdAreas.qtd}</Cell>
                        <Cell>{novaProdAreas.praga}</Cell>
                        <Cell style={{width: 100}}>{novaProdAreas.equipto}</Cell>
                    </Row>
                </ScrollView>
            );
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

    useEffect(() => {
        async function loadAvistamento(){
            try{
                const realm = await getRealm();
                const storedNaoConformidades = realm.objects("OcorrenciasTable").filtered(`roteiro_id == '${roteiro.roteiro_de_servico_id}'`);

                const loadedItems = storedNaoConformidades.map((item: any) => ({
                    id: item.id,
                    area: item.area,
                    ocorrencia: item.ocorrencia,
                    data: item.data,
                    hora: item.hora,
                }));

                setOcoRenderedItems(loadedItems.map(renderOcorrencia));
            } catch(error){
                console.error("Avistamento - Erro ao carregar dados do banco:", error);
            }
        }

        loadAvistamento()
    },[])

    useEffect(() => {
        async function loadProdAreas() {
            try {
                const realm = await getRealm();
                const storedProdAreas = realm.objects("ProdutosPorAreaTable").filtered(`roteiro_id == '${roteiro.roteiro_de_servico_id}'`);

                const loadedItems = storedProdAreas.map((item: any) => ({
                    id: item.id,
                    area: item.area,
                    praga: item.praga,
                    qtd: item.qtd,
                    produto: item.produto,
                    equipto: item.equipto
                }));

                setProdRenderedItems(loadedItems.map(renderProdAreas));
            } catch (error) {
                console.error("Erro ao carregar dados do banco:", error);
            }
        }
        loadProdAreas();
    }, [])

    return (
        <Container>
            <ScrollView>
                <HeaderScreen title={t("dados_review")} />
                <HeaderTable>
                    <TitleHeader>{t("nao_conformidades")}</TitleHeader>
                    <NumbersOfRow>{renderedItems.length}</NumbersOfRow>
                </HeaderTable>   
                    {renderedItems}  
                <HeaderTable>
                    <TitleHeader>{t("produtos_por_areas")}</TitleHeader>
                    <NumbersOfRow>{prodRenderedItems.length}</NumbersOfRow>
                </HeaderTable>
                    {prodRenderedItems}
                <HeaderTable>
                    <TitleHeader>{t("avistamentos")}</TitleHeader>
                    <NumbersOfRow>{ocoRenderedItems.length}</NumbersOfRow>
                </HeaderTable> 
                    {ocoRenderedItems}
                <ButtonForm style={{height: 450, alignItems: 'flex-end',}}>
                    <Button 
                        title={t("voltar")} 
                        type="SECONDARY"
                        onPress={() => navigation.goBack()}
                    />
                    
                    <Button 
                        title={`Finalizar ${t("servico")}`}
                        type="TERTIARY"
                        onPress={finishService}
                    />
                </ButtonForm>             
            </ScrollView>
        </Container>
    )
}