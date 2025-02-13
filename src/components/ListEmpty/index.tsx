import { ViewProps } from "react-native";
import { Container, Message } from "./styles";

type Props = ViewProps &{
    message: string;
}

export function ListEmpty({message, ...rest}: Props,) {
    return (
        <Container {...rest}>
            <Message>
                {message}
            </Message>
        </Container>
    )
}