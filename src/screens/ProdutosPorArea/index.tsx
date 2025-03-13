import { useState, useEffect } from "react";
import { getRealm } from "src/database/realm";
import { Container, Cell, Row, SubForm } from "./styles";
import { HeaderScreen } from "@components/Header";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Button } from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import { DataTable } from "@components/DataTable";
import { CustomCheckbox } from "@components/Checkbox";
import { ScrollView, Alert, View, Text } from "react-native";
import { Input } from "@components/Input";
import { DropdownComponent2 } from "@components/Dropdown2";
import { useTranslation } from 'react-i18next';

type ProdutosAreaRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function ProdutosPorArea() {
    const route = useRoute<ProdutosAreaRouteProp>();
    const navigation = useNavigation();
    const [areas, setAreas] = 
        useState<Array<{
            value: string; 
            label: string;
        }>>([]);
    const [equiptos, setEquiptos] = 
    useState<Array<{
        value: string; 
        label: string;
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
        unidade: string;
    }>>([]);
    const [selectedPragas, setSelectedPragas] = useState("");
    const [selectedProdutos, setSelectedProdutos] = useState("");
    const [qtd, setQtd] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedEquipamentos, setSelectedEquipamentos] = useState("");
    const [renderedItems, setRenderedItems] = useState<any[]>([]);
    const [valueRendered, setValueRendered] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const [selectedProdutosId, setSelectedProdutosId] = useState("");
    const [selectedAreaId, setSelectedAreaId] = useState("");
    const [selectedEquipamentosId, setSelectedEquipamentosId] = useState("");
    const [selectedPragasId, setSelectedPragasId] = useState("");

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
                    <Cell style={{width: 100}}>{novaProdAreas.equipto}</Cell>
                </Row>
            </ScrollView>
        );
    }

    function handleAddProdutos() {
        if(!selectedProdutos || !selectedPragas){
            alert("Complete todos los campos");
            return
        }

        console.log("console",selectedEquipamentosId)
        
        const novosProdutos = {
            id: Date.now().toString(),    // Gerando um ID único
            roteiro_id: roteiro.roteiro_de_servico_id,  // Criando um ID único
            area: selectedArea,
            area_id: selectedAreaId,
            qtd: qtd,
            equipto: selectedEquipamentos,
            equiptos_id: selectedEquipamentosId,
            produto: selectedProdutos,
            produto_id: selectedProdutosId,
            praga: selectedPragas,
            pragas_id: selectedPragasId
        };

        setRenderedItems(prevState => [...prevState, renderProdAreas(novosProdutos)]);
        setValueRendered([...valueRendered, novosProdutos]);

        setSelectedArea("");
        setSelectedProdutos("");
        setSelectedEquipamentos("");
        setSelectedPragas("");
        setQtd("")

        setSelectedAreaId("");
        setSelectedProdutosId("");
        setSelectedEquipamentosId("");
        setSelectedPragasId("");
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
            Alert.alert(t("erro"), t("m_produto_adicionado"));
            return;
        }

        try {
            const realm = await getRealm();

            console.log("rendered", valueRendered)
            realm.write(() => {
                valueRendered.forEach((item) => {   
                    const existe = realm.objects("ProdutosPorAreaTable").filtered(`id == '${item.id}'`).length > 0;
                 
                    if (!existe) {
                        realm.create("ProdutosPorAreaTable", {
                            id: Date.now().toString(),
                            roteiro_id: roteiro.roteiro_de_servico_id,
                            area: item.area,
                            praga: item.praga,
                            qtd: item.qtd,
                            produto: item.produto,
                            equipto: item.equipto,
                            area_id: item.area_id,
                            equipto_id: item.equiptos_id,
                            produto_id: item.produto_id,
                            praga_id: item.pragas_id,
                        });
                    }
                });
            });

            Alert.alert(t("sucesso"), t("m_produto_sucesso"));
        } catch (error) {
            console.error("Erro ao salvar no banco:", error);
        } finally{
            navigation.goBack()
        }
    }


    async function removeRow() {
        if (selectedItems.length === 0) {
            Alert.alert(t("erro"), t("m_erro_linha"));
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

        } catch (error) {
            console.error("Erro ao remover do banco:", error);
        }
    }


    useEffect(() => {
        if (roteiro && roteiro.areas) {

            const listAreas = roteiro.areas.map((item: any, index: number) => ({
                value: item.area_id,
                label: item.desc_area,
            }));
            setAreas([...listAreas]);

            console.log(listAreas);

            for(let i = 0; i < roteiro.produtos.length; i++){
                    console.log('citado: ',roteiro.produtos[i].citado_ida);
                    const listProdutos = roteiro.produtos
                    .filter((item: any) => item.citado_ida === "1") // Filtra os produtos citados
                    .map((item: any) => ({
                        nome_prod: item.nome_prod,
                        prod_id: item.prod_id,
                        unidade: item.unidade,
                    }));
                    setProdutos([...listProdutos]);
            }
            
            /* for(let i = 0; i < roteiro.produtos.length; i++){
                const listProdutos = roteiro.produtos
                .map((item: any) => ({
                    nome_prod: item.nome_prod,
                    prod_id: item.prod_id,
                    unidade: item.unidade,
                }));
                setProdutos([...listProdutos]);
            } */
        }

        if(generalData){
            const listPragas = generalData.Pragas.map((item: any, index: number) => ({
                praga_id: item.praga_id,
                desc_praga: item.desc_praga,
            }));
            setPragas([...listPragas]);

            const listEquiptos = generalData.Equiptos.map((item: any, index: number) => ({
                value: item.equipto_id,
                label: item.desc_equipto,
            }));
            setEquiptos([...listEquiptos]);    
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

                setValueRendered(loadedItems);
                setRenderedItems(loadedItems.map(renderProdAreas));
            } catch (error) {
                console.error("Erro ao carregar dados do banco:", error);
            }
        }
        loadProdAreas();

        console.log("area:", selectedAreaId);

        const equipto = [
            { label: '', value: '' },
            ...equiptos.map(equipto => ({ label: equipto.label, value: equipto.value }))
        ];
        
        console.log("Dados passados em variavel equip:", equiptos);
        console.log("Dados passados para o dropdown de equip:", equipto);
        console.log("Dados passados para o dropdown de setequipt:", selectedEquipamentosId);
    }, [])

    return (
        <Container>
            <HeaderScreen title={t("produtos_por_areas")} />
            <DropdownComponent2 
                data={[
                    { label:'', value:''},
                    ...pragas.map(praga => ({ label: praga.desc_praga, value: praga.praga_id }))]}
                label={t("pragas")}
                onSelect={(value : any, id : any) =>{
                    setSelectedPragas(value)
                    setSelectedPragasId(id)
                }}
                value={selectedPragas}
            />
            <DropdownComponent2 
                data={[
                    { label:'', value:''},
                    ...produtos.map(produto => ({ label: produto.nome_prod, value: produto.prod_id }))
                ]} 
                label={t("produtos")}
                onSelect={(value : any, id : any) =>{
                    setSelectedProdutos(value)
                    setSelectedProdutosId(id)
                }}
                value={selectedProdutos}
            />

            <SubForm>
                <Input 
                    placeholder={t("quantidade")}
                    keyboardType="number-pad"
                    onChangeText={setQtd}
                    value={qtd}
                />
                    {
                        produtos.map(produto => {
                            if(selectedProdutos === produto.nome_prod){
                                return(
                                    <View style={{marginRight: 20}}>
                                        <Text style={{fontSize: 20}}>
                                            {produto.unidade}
                                        </Text>
                                    </View>
                                )
                            }
                        })           
                    }
            </SubForm>

            <DropdownComponent2 
                data={[
                    {label: '', value:''},
                    ...areas.map(area => ({ label: area.label, value: area.value }))
                ]} 
                label="Áreas"
                onSelect={(value : any, id : any) =>{
                    setSelectedArea(value)
                    setSelectedAreaId(id)
                }}
                value={selectedArea}
            />
            <DropdownComponent2 
                data={[
                    { label:'', value:''},
                    ...equiptos.map(equipto => ({ label: equipto.label, value: equipto.value }))]} 
                label={t("equipamento")}
                onSelect={(value : any, id : any) =>{
                    setSelectedEquipamentos(value)
                    setSelectedEquipamentosId(id)
                }}
                value={selectedEquipamentos}
            />
            <ScrollView>            
                <Button 
                    title={t("adicionar")}
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
                    title={t("voltar")}
                    type="SECONDARY" 
                    onPress={handleGoBack}
                />
                <Button 
                    title={t("salvar")}
                    type="TERTIARY"
                    onPress={handleFinishService}
                />
            </ButtonForm>
        </Container>
    )
}