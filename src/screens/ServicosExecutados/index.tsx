import { Container } from "./styles";
import { HeaderScreen } from "@components/Header";
import { useContext, useState } from "react";
import { FlatList } from "react-native";
import { RoteirosContext } from "src/context/RoteirosContext";

export function ServicosExecutados() {
    const {roteiros} = useContext(RoteirosContext)
    const [roteirosExecutados, setRoteirosExecutados] = useState(roteiros.filter(roteiro => roteiro.status === '2'))

    console.log(roteirosExecutados)

    return (
        <Container>
            <HeaderScreen title="Serviços Executados" />
        </Container>
    )
}