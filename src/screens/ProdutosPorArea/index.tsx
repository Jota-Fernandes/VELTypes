import { useState, useEffect } from "react";

import { Container, Cell, Row } from "./styles";
import { HeaderScreen } from "@components/Header";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Button } from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import { DataTable } from "@components/DataTable";
import { CustomCheckbox } from "@components/Checkbox";
import { ScrollView, Alert } from "react-native";

import { DropdownComponent2 } from "@components/Dropdown2"; 

type ProdutosAreaRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function ProdutosPorArea() {
    const route = useRoute<ProdutosAreaRouteProp>();
    const navigation = useNavigation();
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
    const [selectedPragas, setSelectedPragas] = useState("");
    const [selectedProdutos, setSelectedProdutos] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedEquipamentos, setSelectedEquipamentos] = useState("");
    const [renderedItems, setRenderedItems] = useState<any[]>([]);
    const [valueRendered, setValueRendered] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const {roteiro, generalData} = route.params

    function toggleSelection(id: string) {
        setSelectedItems(prevSelected => 
            prevSelected.includes(id) 
                ? prevSelected.filter(itemId => itemId !== id)
                : [...prevSelected, id]
        );
    }

    function renderOcorrencia(novaOcorrencia: any) {
        return (
            <ScrollView horizontal={true} key={novaOcorrencia.id}>
                <Row>
                    <CustomCheckbox  onPress={() => toggleSelection(novaOcorrencia.id)}/>
                    <Cell>{novaOcorrencia.area}</Cell>
                    <Cell>{novaOcorrencia.ocorrencia}</Cell>
                    <Cell>{novaOcorrencia.data}</Cell>
                    <Cell>{novaOcorrencia.hora}</Cell>
                </Row>
            </ScrollView>
        );
    }

    function handleAddProdutos() {
        if(!selectedProdutos || !selectedPragas){
            alert("Preencha todos os campos!");
            return
        }
        
        const novosProdutos = {
            id: Date.now().toString(),    // Gerando um ID único
            roteiro_id: roteiro.roteiro_de_servico_id,  // Criando um ID único
            area: selectedArea,
            equipamento: selectedEquipamentos,
            produto: selectedProdutos,
            praga: selectedPragas
        };

        setRenderedItems(prevState => [...prevState, renderOcorrencia(novosProdutos)]);
        setValueRendered([...valueRendered, novosProdutos]);


        setSelectedArea("");
        setSelectedProdutos("");
        setSelectedEquipamentos("");
        setSelectedPragas("");
    }

    function handleGoBack(){
        Alert.alert("Retornar", "Deseja retornar? Os dados que não foram finalizado serão perdidos", [
            {
                text: 'Sim',
                onPress: () => navigation.goBack()
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }


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
            <DropdownComponent2 
                data={pragas.map(praga => ({ label: praga.desc_praga, value: praga.praga_id }))}
                label="Pragas"
                onSelect={setSelectedPragas}
                value={selectedPragas}
            />
            <DropdownComponent2 
                data={produtos.map(produto => ({ label: produto.nome_prod, value: produto.prod_id }))} 
                label="Produtos"
                onSelect={setSelectedProdutos}
                value={selectedProdutos}
            />
            <DropdownComponent2 
                data={areas.map(area => ({ label: area.desc_area, value: area.area_id }))} 
                label="Áreas"
                onSelect={setSelectedArea}
                value={selectedArea}
            />
            <DropdownComponent2 
                data={equiptos.map(equipto => ({ label: equipto.desc_equipto, value: equipto.equipto_id }))} 
                label="Equipamentos"
                onSelect={setSelectedEquipamentos}
                value={selectedEquipamentos}
            />
            <ScrollView>            
                <Button 
                    title="Adicionar"
                    type="PRIMARY"
                    onPress={handleAddProdutos}
                />
                <DataTable />
                {renderedItems}
            </ScrollView>
            <ButtonForm>
                <Button 
                    title="Voltar" 
                    type="SECONDARY" 
                    onPress={handleGoBack}
                />
                <Button title="Finalizar" type="TERTIARY"/>
            </ButtonForm>
        </Container>
    )
}