import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

import { DropdownComponent } from "@components/Dropdown";
import { PhotoPhorm } from "@components/PhotoPhorm";
import {Button} from "@components/Button";
import { ButtonForm } from "@components/Button/styles";

import { Container, Heading, TitleHeader, Title, SubForm } from "./styles";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
]

export function Armadilha(){
    return(
        <Container>
            <ScrollView>
                <Heading>Armadilhas Nº5</Heading>
                <TitleHeader>
                    <Title>Armadilha</Title>
                </TitleHeader>
                <DropdownComponent 
                    data={data}
                    label="Status"
                />
                <DropdownComponent 
                    data={data}
                    label="Ação"
                />
                <TitleHeader>
                    <Title>Isca</Title>
                </TitleHeader>
                <DropdownComponent 
                    data={data}
                    label="Status"
                />
                <DropdownComponent 
                    data={data}
                    label="Ação"
                />
                <TitleHeader>
                    <Title>Produtos</Title>
                </TitleHeader>
                <DropdownComponent 
                    data={data}
                    label="Produtos"
                />
                <SubForm>
                    <Input
                        placeholder="Quantidade"
                    />
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <MaterialIcons name="add-circle" size={24} color="green" />
                    </TouchableOpacity>
                </SubForm>
                <TitleHeader>
                    <Title>Ocorrências</Title>
                </TitleHeader>
                <DropdownComponent 
                    data={data}
                    label="Ocorrências"
                />
                <SubForm>
                    <Input
                        placeholder="Vivas"
                    />
                    <Input
                        placeholder="Mortas"
                    />
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <MaterialIcons name="add-circle" size={24} color="green" />
                    </TouchableOpacity>
                </SubForm>
                <PhotoPhorm 
                    title="Fotos das Armadilhas"
                />
                <ButtonForm>
                    <Button
                        title="Voltar"
                        type="SECONDARY"
                    />
                    <Button
                        title="Salvar"
                        type="PRIMARY"
                    />
                </ButtonForm>
            </ScrollView>
        </Container>
    )
}