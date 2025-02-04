import { HeaderScreen } from "@components/Header";
import { DropdownComponent } from "@components/Dropdown";
import { PhotoPhorm } from "@components/PhotoPhorm";
import { ButtonForm } from "@components/Button/styles";
import { Button } from "@components/Button";
import { DataTable  } from "@components/DataTable";
import { useNavigation } from "@react-navigation/native";
import { useRoute, RouteProp } from "@react-navigation/native";

import { Container } from "./styles";
import { useEffect, useState } from "react";

type AvistamentoRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

const data = [
    { label: 'Ocorrências', value: '0' },
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
]

export function Avistamentos() {
    const [areas, setAreas] = 
    useState<Array<{
        area_id: string; 
        desc_area: string;
    }>>([]);
    const [ocorrencias, setOcorrencias] = 
    useState<Array<{
        oco_id: string; 
        desc_oco: string;
    }>>([]);
    const route = useRoute<AvistamentoRouteProp>();
    const {roteiro, generalData} = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        if (roteiro && roteiro.areas) {

            const listAreas = roteiro.areas.map((item: any, index: number) => ({
                id: item.area_id,
                desc_area: item.desc_area,
            }));

            setAreas([{ id: '', desc_area: 'Áreas' }, ...listAreas]);
        }

        if(generalData){
            const listOcorrencias = generalData.Ocorrencias.map((item: any, index: number) => ({
                oco_id: item.oco_id,
                desc_oco: item.desc_oco,
            }));
            setOcorrencias([{ oco_id: '', desc_oco: 'Não Conformidade' }, ...listOcorrencias]);

        }
    }, [roteiro, generalData]);

    return (
        <Container>
            <HeaderScreen title="Avistamentos" />
            <DropdownComponent 
                data={ocorrencias.map(oco => ({ label: oco.desc_oco, value: oco.oco_id }))} 
                label="Ocorrências" 
            />
            <DropdownComponent 
                data={areas.map(area => ({ label: area.desc_area, value: area.area_id }))}  
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
                    onPress={()=> navigation.goBack()}
                />

                <Button 
                    title="Finalizar" 
                    type="TERTIARY"
                />
            </ButtonForm>
        </Container>
    )
}