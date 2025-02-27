import { useState, useEffect } from "react";
import { getRealm } from "src/database/realm";
import { Container, Cell, Row, SubForm } from "./styles";
import { HeaderScreen } from "@components/Header";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Button } from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import { DataTable } from "@components/DataTable";
import { CustomCheckbox } from "@components/Checkbox";
import { ScrollView, Alert } from "react-native";
import { Input } from "@components/Input";
import { DropdownComponent2 } from "@components/Dropdown2";
import { useTranslation } from 'react-i18next';

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
    const [qtd, setQtd] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedEquipamentos, setSelectedEquipamentos] = useState("");
    const [renderedItems, setRenderedItems] = useState<any[]>([]);
    const [valueRendered, setValueRendered] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const {roteiro, generalData} = route.params

    const {t} = useTranslation();

    function toggleSelection(id: string) {
        setSelectedItems(prevSelected => 
            prevSelected.includes(id) 
                ? prevSelected.filter(itemId => itemId !== id)
                : [...prevSelected, id]
        );
    }

    function renderProdAreas(novaProdAreas: any) {
        
        return (
            <ScrollView horizontal={true} key={novaProdAreas.id}>
                <Row>
                    <CustomCheckbox  onPress={() => toggleSelection(novaProdAreas.id)}/>
                    <Cell>{novaProdAreas.area}</Cell>
                    <Cell>{novaProdAreas.produto}</Cell>
                    <Cell>{novaProdAreas.qtd}</Cell>
                    <Cell>{novaProdAreas.praga}</Cell>
                    <Cell>{novaProdAreas.equipto}</Cell>
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
            qtd: qtd,
            equipto: selectedEquipamentos,
            produto: selectedProdutos,
            praga: selectedPragas
        };

        setRenderedItems(prevState => [...prevState, renderProdAreas(novosProdutos)]);
        setValueRendered([...valueRendered, novosProdutos]);

        setSelectedArea("");
        setSelectedProdutos("");
        setSelectedEquipamentos("");
        setSelectedPragas("");
        setQtd("")
    }

    function handleGoBack(){
        Alert.alert(t("voltar"), t("m_voltar"), [
            {
                text: t("sim"),
                onPress: () => navigation.goBack()
            },
            {
                text: t("nao"),
                style: 'cancel'
            }
        ])
    }

    async function handleFinishService() {
        if (valueRendered.length === 0) {
            Alert.alert("Erro", "Nenhuma não conformidade adicionada!");
            return;
        }

        try {
            const realm = await getRealm();
            realm.write(() => {
                valueRendered.forEach((item) => {                
                    console.log("item", item.praga)    
                    const existe = realm.objects("ProdutosPorAreaTable").filtered(`id == '${item.id}'`).length > 0;
                 
                    if (!existe) {
                        realm.create("ProdutosPorAreaTable", {
                            id: Date.now().toString(),
                            roteiro_id: roteiro.roteiro_de_servico_id,
                            area: item.area,
                            praga: item.praga,
                            qtd: item.qtd,
                            produto: item.produto,
                            equipto: item.equipto
                        });
                    }
                });
            });

            Alert.alert("Sucesso", "Os produtos foram salvos com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar no banco:", error);
        } finally{
            navigation.goBack()
        }
    }


    async function removeRow() {
        if (selectedItems.length === 0) {
            Alert.alert("Erro", "Nenhuma linha selecionada para remover!");
            return;
        }

        try {
            const realm = await getRealm();
            realm.write(() => {
                selectedItems.forEach(id => {
                    const itemToDelete = realm.objects("ProdutosPorAreaTable").filtered(`id == '${id}'`);
                    if (itemToDelete.length > 0) {
                        realm.delete(itemToDelete);
                    }
                });
            });

            setValueRendered(prev => prev.filter(item => !selectedItems.includes(item.id)));
            setRenderedItems(prev => prev.filter(item => !selectedItems.includes(item.key)));
            setSelectedItems([]); 

            Alert.alert("Sucesso", "Itens removidos com sucesso!");
        } catch (error) {
            console.error("Erro ao remover do banco:", error);
        }
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

    useEffect(() => {
        async function loadProdAreas() {
            try {
                const realm = await getRealm();
                const storedProdAreas = realm.objects("ProdutosPorAreaTable").filtered(`roteiro_id == '${roteiro.roteiro_de_servico_id}'`);

                const loadedItems = storedProdAreas.map((item: any) => ({
                    id: item.id,
                    area: item.area,
                    praga: item.praga,
                    qtd: item.qtd,
                    produto: item.produto,
                    equipto: item.equipto
                }));

                console.log('Load',loadedItems)

                setValueRendered(loadedItems);
                setRenderedItems(loadedItems.map(renderProdAreas));
            } catch (error) {
                console.error("Erro ao carregar dados do banco:", error);
            }
        }
        loadProdAreas();
    }, [])

    return (
        <Container>
            <HeaderScreen title={t("produtos_por_areas")} />
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

            <SubForm>
                <Input 
                    placeholder="Quantidade"
                    keyboardType="number-pad"
                    onChangeText={setQtd}
                    value={qtd}
                />
            </SubForm>

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
                <DataTable 
                    title={t("produtos_por_areas")}
                    onPress={removeRow}
                />
                {renderedItems}
            </ScrollView>
            <ButtonForm>
                <Button 
                    title="Voltar" 
                    type="SECONDARY" 
                    onPress={handleGoBack}
                />
                <Button 
                    title="Finalizar" 
                    type="TERTIARY"
                    onPress={handleFinishService}
                />
            </ButtonForm>
        </Container>
    )
}