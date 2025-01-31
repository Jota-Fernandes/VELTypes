import { HeaderScreen } from "@components/Header";
import { DropdownComponent } from "@components/Dropdown";
import { PhotoPhorm } from "@components/PhotoPhorm";
import { ButtonForm } from "@components/Button/styles";
import { Button } from "@components/Button";
import { DataTable  } from "@components/DataTable";

import { Container } from "./styles";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
]

export function Avistamentos() {
    return (
        <Container>
            <HeaderScreen title="Avistamentos" />
            <DropdownComponent 
                data={data} 
                label="Ocorrências" 
            />
            <DropdownComponent 
                data={data} 
                label="Áreas" 
            />
            <PhotoPhorm title="Fotos dos avistamentos" />

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