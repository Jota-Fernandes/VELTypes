
import { HeaderScreen } from "@components/Header";
import {DropdownComponent} from "@components/Dropdown";
import { Button } from "@components/Button";
import { ButtonForm  } from "@components/Button/styles";
import { PhotoPhorm } from "@components/PhotoPhorm";
import { DataTable } from "@components/DataTable";

import { Container } from "./styles";

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

export function NaoConformidades() {
    return (
        <Container>
            <HeaderScreen title="Não Conformidades" />
            <DropdownComponent 
                data={data}
                label="Áreas"
            />
            <DropdownComponent 
                data={data}
                label="Não conformidade"
            />
            <DropdownComponent 
                data={data}
                label="Registrada"
            />
            <DropdownComponent 
                data={data}
                label="Responsável"
            />
            <DropdownComponent 
                data={data}
                label="Medidas Corretivas"      
            />
            <DropdownComponent 
                data={data}
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
                />

                <Button 
                    title="Finalizar" 
                    type="TERTIARY"
                />
            </ButtonForm>
        </Container>
    )
}