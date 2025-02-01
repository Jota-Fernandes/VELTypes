import { Container } from "./styles";
import { HeaderScreen } from "@components/Header";
import { DropdownComponent } from "@components/Dropdown";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Button } from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import { DataTable } from "@components/DataTable";
import { useState, useEffect } from "react";

type ProdutosAreaRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
]

export function ProdutosPorArea() {
    const [areas, setAreas] = 
        useState<Array<{
            area_id: string; 
            desc_area: string;
        }>>([]);
    const route = useRoute<ProdutosAreaRouteProp>();
    const navigation = useNavigation();

    const {roteiro} = route.params

    useEffect(() => {
        if (roteiro && roteiro.areas) {

            const listAreas = roteiro.areas.map((item: any, index: number) => ({
                id: item.area_id,
                desc_area: item.desc_area,
            }));

            setAreas([{ id: '', desc_area: 'Áreas' }, ...listAreas]);
        }
    }, [roteiro]);

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
                data={areas.map(area => ({ label: area.desc_area, value: area.area_id }))} 
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
                <Button 
                    title="Voltar" 
                    type="SECONDARY" 
                    onPress={()=> navigation.goBack()}
                />
                <Button title="Finalizar" type="TERTIARY"/>
            </ButtonForm>
        </Container>
    )
}