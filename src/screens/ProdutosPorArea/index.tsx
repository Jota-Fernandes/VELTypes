import { Container } from "./styles";
import { HeaderScreen } from "@components/Header";
import { DropdownComponent } from "@components/Dropdown";

import { Button } from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import { DataTable } from "@components/DataTable";


const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
]

export function ProdutosPorArea() {
    return (
        <Container>
            <HeaderScreen title="Produtos por Área" />
            <DropdownComponent 
                data={data} 
                label="Pragas"
            />
            <DropdownComponent 
                data={data} 
                label="Produtos"
            />
            <DropdownComponent 
                data={data} 
                label="Áreas"
            />
            <DropdownComponent 
                data={data} 
                label="Equipamentos"
            />

            <Button 
                title="Adicionar"
                type="PRIMARY"
            />
            <DataTable />
            <ButtonForm>
                <Button title="Cancelar" type="SECONDARY" />
                <Button title="Finalizar" type="TERTIARY"/>
            </ButtonForm>
        </Container>
    )
}