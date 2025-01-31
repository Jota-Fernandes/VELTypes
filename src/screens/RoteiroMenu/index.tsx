import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';

import { ScreenCard } from "@components/ScreenCard";
import { Container, Content } from "./styles";

export function RoteiroMenu(){

    const {t} = useTranslation();

    const navigation = useNavigation();

    return(
        <Container>
            <Content>
                <ScreenCard 
                    icon="bug-report" 
                    title={t('armadilhas')}
                    onPress={() => navigation.navigate('MenuArmadilhas')}
                />
                <ScreenCard 
                    icon="visibility" 
                    title={t('avistamentos')}
                    onPress={() => navigation.navigate('Avistamentos')}

                />
                <ScreenCard 
                    icon="thumb-down-off-alt" 
                    title={t('nao_conformidades')}
                    onPress={() => navigation.navigate('NaoConformidades')}
                />
                <ScreenCard 
                    icon="thumb-up-off-alt" 
                    title={t('baixar_nao_conformidades')}
                    onPress={() => navigation.navigate('BaixaNaoConformidades')}

                />
                <ScreenCard 
                    icon="fire-extinguisher" 
                    title={t('produtos_por_areas')}
                    onPress={() => navigation.navigate('ProdutosPorArea')}
                />
                <ScreenCard 
                    icon="description" 
                    title={t('dados_do_servico')}
                    onPress={() => navigation.navigate('DadosServicos')}
                />
                <ScreenCard 
                    icon="arrow-back" 
                    title={t('voltar')}
                    onPress={() => navigation.goBack()}
                />
                <ScreenCard 
                    icon="check" 
                    title={t('finalizar_servico')}
                    onPress={() => navigation.navigate('DadosReview')}
                />
            </Content>
        </Container>
    )
}