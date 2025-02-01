
import { HeaderScreen } from "@components/Header";
import {DropdownComponent} from "@components/Dropdown";
import { Button } from "@components/Button";
import { ButtonForm  } from "@components/Button/styles";
import { PhotoPhorm } from "@components/PhotoPhorm";
import { DataTable } from "@components/DataTable";
import { ScrollView } from "react-native";
import { Container } from "./styles";
import { useNavigation } from "@react-navigation/native";
const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const registrada = [
    { label: '-- Registrada --', value: '0' },
    { label: 'Sim', value: '1' },
    { label: 'Não', value: '2' },
  ];

  const responsavel = [
    { label: '-- Responsável --', value: '0' },
    { label: 'Cliente', value: '1' },
    { label: 'Empresa', value: '2' },
  ];

  const prazo = [
    { label: '-- Prazo -- ', value: '0' },
    { label: 'Imediato', value: '1' },
    { label: '2 Meses', value: '2' },
    { label: '3 Meses', value: '3' },
  ];

export function NaoConformidades() {
    const navigation = useNavigation();
    return (
        <Container>
            <HeaderScreen title="Não Conformidades" />
            <ScrollView>
                <DropdownComponent 
                    data={data}
                    label="Áreas"
                />
                <DropdownComponent 
                    data={data}
                    label="Não conformidade"
                />
                <DropdownComponent 
                    data={registrada}
                    label="Registrada"
                />
                <DropdownComponent 
                    data={responsavel}
                    label="Responsável"
                />
                <DropdownComponent 
                    data={data}
                    label="Medidas Corretivas"      
                />
                <DropdownComponent 
                    data={prazo}
                    label="Prazo"
                />

                <PhotoPhorm title="Fotos das Não Conformidades"/>

                <Button 
                    title="Adicionar" 
                    type="PRIMARY"
                />
                
                <DataTable/>

                <ButtonForm>
                    <Button 
                        title="Voltar" 
                        type="SECONDARY"
                        onPress={() => navigation.goBack()}
                    />

                    <Button 
                        title="Finalizar" 
                        type="TERTIARY"
                    />
                </ButtonForm>
            </ScrollView>
        </Container>
    )
}