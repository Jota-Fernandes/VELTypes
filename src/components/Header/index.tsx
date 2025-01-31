import { Container, Title } from "./styles";

type Props = {
    title: string;
} 
export function HeaderScreen({title}: Props) {
    return (
        <Container>
            <Title>
                {title}
            </Title>
        </Container>
    )
}