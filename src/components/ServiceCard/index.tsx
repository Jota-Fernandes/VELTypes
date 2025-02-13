import { Container, Title, Subtitle, TitleContainer } from "./styles";
import {MaterialIcons} from '@expo/vector-icons'

type Props = {
    title: string;
    secondTitle?: string;
    subtitle: string;
}

export function ScreenCard({title, secondTitle ,subtitle} : Props){
    return(
        <Container>
            <MaterialIcons name="settings-suggest" size={48} color="#3A797A" />
            <TitleContainer>
                <Title>{title}</Title>
                <Title>{secondTitle}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </TitleContainer>
        </Container>
    )
}