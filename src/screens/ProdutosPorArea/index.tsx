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
    const [equiptos, setEquiptos] = 
    useState<Array<{
        equipto_id: string; 
        desc_equipto: string;
    }>>([]);
    const [pragas, setPragas] = 
    useState<Array<{
        praga_id: string; 
        desc_praga: string;
    }>>([]);
    const [produtos, setProdutos] = 
    useState<Array<{
        nome_prod: string; 
        prod_id: string;
    }>>([]);
    const route = useRoute<ProdutosAreaRouteProp>();
    const navigation = useNavigation();

    const {roteiro, generalData} = route.params

    useEffect(() => {
        if (roteiro && roteiro.areas) {

            const listAreas = roteiro.areas.map((item: any, index: number) => ({
                id: item.area_id,
                desc_area: item.desc_area,
            }));
            setAreas([{ id: '', desc_area: 'Áreas' }, ...listAreas]);

            const listProdutos = roteiro.produtos.map((item: any, index: number) => ({
                prod_id: item.prod_id,
                nome_prod: item.nome_prod,
            }));

            setProdutos([{ prod_id: '', nome_prod: 'Produtos' }, ...listProdutos]);
        }

        if(generalData){
            const listPragas = generalData.Pragas.map((item: any, index: number) => ({
                praga_id: item.praga_id,
                desc_praga: item.desc_praga,
            }));
            setPragas([{ praga_id: '', desc_praga: 'Pragas' }, ...listPragas]);

            const listEquiptos = generalData.Equiptos.map((item: any, index: number) => ({
                equipto_id: item.equipto_id,
                desc_equipto: item.desc_equipto,
            }));
            setEquiptos([{ equipto_id: '', desc_equipto: 'Equipamento' }, ...listEquiptos]);

          
        }
    }, [roteiro, generalData]);

    return (
        <Container>
            <HeaderScreen title="Produtos por Área" />
            <DropdownComponent 
                data={pragas.map(praga => ({ label: praga.desc_praga, value: praga.praga_id }))} 
                label="Pragas"
            />
            <DropdownComponent 
                data={produtos.map(produto => ({ label: produto.nome_prod, value: produto.prod_id }))} 
                label="Produtos"
            />
            <DropdownComponent 
                data={areas.map(area => ({ label: area.desc_area, value: area.area_id }))} 
                label="Áreas"
            />
            <DropdownComponent 
                data={equiptos.map(equipto => ({ label: equipto.desc_equipto, value: equipto.equipto_id }))} 
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