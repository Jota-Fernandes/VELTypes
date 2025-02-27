import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import { ScreenCard } from "@components/ScreenCard";
import { Container, Content } from "./styles";

import { useEffect } from "react";

type RoteiroMenuRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function RoteiroMenu(){
    const route = useRoute<RoteiroMenuRouteProp>();
    const {roteiro} = route.params;
    const {generalData} = route.params
    const {t} = useTranslation();

    const navigation = useNavigation()

    return(
        <Container>
            <Content>
                {
                    roteiro.armadilhas.length > 0 ?
                    <ScreenCard 
                        icon="bug-report" 
                        title={t('armadilhas')}
                        onPress={() => navigation.navigate('MenuArmadilhas', {roteiro, generalData})}
                        style={{elevation: 10}}
                    /> :
                    <ScreenCard 
                        icon="bug-report" 
                        title={t('armadilhas')}
                        style={{backgroundColor: '#bdbdbd', elevation: 10}}
                    />
                }
                <ScreenCard 
                    icon="visibility" 
                    title={t('avistamentos')}
                    onPress={() => navigation.navigate('Avistamentos', {roteiro, generalData} )}
                    style={{elevation: 10}}

                />
                <ScreenCard 
                    icon="thumb-down-off-alt" 
                    title={t('nao_conformidades')}
                    onPress={() => navigation.navigate('NaoConformidades', {roteiro, generalData})}
                    style={{elevation: 10}}
                />
                {
                    roteiro.nc_previas.length > 0 ?
                    <ScreenCard 
                        icon="thumb-up-off-alt"
                        title={t('baixar_nao_conformidades')}
                        onPress={() => navigation.navigate('BaixaNaoConformidades', {roteiro})}
                        style={{elevation: 10}}
    
                    /> : 
                    <ScreenCard 
                        icon="thumb-up-off-alt" 
                        title={t('baixar_nao_conformidades')}
                        style={{backgroundColor: '#bdbdbd', elevation: 10}}
                    />
                }
                <ScreenCard 
                    icon="fire-extinguisher" 
                    title={t('produtos_por_areas')}
                    onPress={() => navigation.navigate('ProdutosPorArea', {roteiro, generalData})}
                    style={{elevation: 10}}
                />
                <ScreenCard 
                    icon="description" 
                    title={t('dados_do_servico')}
                    onPress={() => navigation.navigate('DadosServicos', {roteiro, generalData})}
                    style={{elevation: 10}}
                />
                <ScreenCard 
                    icon="arrow-back" 
                    title={t('voltar')}
                    onPress={() => navigation.navigate("Servicos", {roteiro, generalData})}
                    style={{elevation: 10}}
                />
                <ScreenCard 
                    icon="check" 
                    title={t('finalizar_servico')}
                    onPress={() => navigation.navigate('DadosReview', {roteiro, generalData})}
                    style={{elevation: 10}}
                />
            </Content>
        </Container>
    )
}