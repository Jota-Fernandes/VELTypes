import { useEffect, useState } from "react";
import { HeaderScreen } from "@components/Header";
import { PhotoPhorm } from "@components/PhotoPhorm";
import { ButtonForm } from "@components/Button/styles";
import { Button } from "@components/Button";
import { DataTable  } from "@components/DataTable";
import { useNavigation } from "@react-navigation/native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { DropdownComponent2 } from "@components/Dropdown2";
import { Input } from "@components/Input";
import { ScrollView, Alert } from "react-native";
import { getRealm } from "src/database/realm";
import { Container, SubForm, Row, Cell } from "./styles";
import { CustomCheckbox } from "@components/Checkbox";

import { useTranslation } from "react-i18next";

type AvistamentoRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

export function Avistamentos() {
    const route = useRoute<AvistamentoRouteProp>();
    const {roteiro, generalData} = route.params;
    const navigation = useNavigation();

    const {t} = useTranslation();

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
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedOcorrencia, setSelectedOcorrencia] = useState("");
    const now = new Date();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [renderedItems, setRenderedItems] = useState<any[]>([]);
    const [valueRendered, setValueRendered] = useState<any[]>([]);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

    function handleAddOcorrencia() {
        if(!selectedOcorrencia || !selectedArea){
            alert("Preencha todos os campos!");
            return
        }
        
        const novaOcorrencia = {
            id: Date.now().toString(),   
            roteiro_id: roteiro.roteiro_de_servico_id,
            ocorrencia: selectedOcorrencia,
            area: selectedArea,
            data: date,
            hora: time
        };

        setRenderedItems(prevState => [...prevState, renderOcorrencia(novaOcorrencia)]);
        setValueRendered([...valueRendered, novaOcorrencia]);


        setSelectedArea("");
        setSelectedOcorrencia("");
    }

    async function handleFinishService(){
        if (valueRendered.length === 0) {
            Alert.alert("Erro", "Nenhuma não conformidade adicionada!");
            return;
        }

        try{
            const realm = await getRealm();
            realm.write(() =>{
                valueRendered.forEach((item) => {          
                    const existe = realm.objects("OcorrenciasTable").filtered(`id == '${item.id}'`).length > 0;
                    if (!existe) {
                        realm.create("OcorrenciasTable", {
                            id: Date.now().toString(),
                            roteiro_id: roteiro.roteiro_de_servico_id,
                            area: item.area,
                            ocorrencia: item.ocorrencia,
                            data: item.data,
                            hora: item.hora,
                        });
                    }
                });
            })
            Alert.alert("Sucesso", "As não conformidades foram salvas com sucesso!");
        } catch (error) {
            console.error('Erro ao inserir no banco',error);
        } finally{
            navigation.goBack()
        }
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


    async function removeRow() {
        if (selectedItems.length === 0) {
            Alert.alert("Erro", "Nenhuma linha selecionada para remover!");
            return;
        }

        try {
            const realm = await getRealm();
            realm.write(() => {
                selectedItems.forEach(id => {
                    const itemToDelete = realm.objects("OcorrenciasTable").filtered(`id == '${id}'`);
                    if (itemToDelete.length > 0) {
                        realm.delete(itemToDelete);
                    }
                });
            });

            // Atualiza os estados, removendo os itens excluídos
            setValueRendered(prev => prev.filter(item => !selectedItems.includes(item.id)));
            setRenderedItems(prev => prev.filter(item => !selectedItems.includes(item.key)));
            setSelectedItems([]); // Limpa a seleção

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
        }

        if(generalData){
            const listOcorrencias = generalData.Ocorrencias.map((item: any, index: number) => ({
                oco_id: item.oco_id,
                desc_oco: item.desc_oco,
            }));
            setOcorrencias([{ oco_id: '', desc_oco: 'Não Conformidade' }, ...listOcorrencias]);

        }
    }, [roteiro, generalData]);

    useEffect(() =>{
        const data = now.toLocaleDateString()
        const hora = now.toLocaleTimeString()

        setDate(data)
        setTime(hora)
    }, [])

    useEffect(() => {
        async function loadAvistamento(){
            try{
                const realm = await getRealm();
                const storedNaoConformidades = realm.objects("OcorrenciasTable").filtered(`roteiro_id == '${roteiro.roteiro_de_servico_id}'`);

                const loadedItems = storedNaoConformidades.map((item: any) => ({
                    id: item.id,
                    area: item.area,
                    ocorrencia: item.ocorrencia,
                    data: item.data,
                    hora: item.hora,
                }));

                setValueRendered(loadedItems);
                setRenderedItems(loadedItems.map(renderOcorrencia));
            } catch(error){
                console.error("Avistamento - Erro ao carregar dados do banco:", error);
            }
        }

        loadAvistamento()
    },[])

    return (
        <Container>
            <HeaderScreen title={t("avistamentos")} />
            <SubForm>
                <Input
                    value={time}
                    onChange={setTime}
                />
            </SubForm>
            
            <SubForm>
                <Input
                    value={date}
                    onChangeText={setDate}
                />
            </SubForm>
            <DropdownComponent2 
                data={ocorrencias.map(oco => ({ label: oco.desc_oco, value: oco.oco_id }))} 
                label={t("avistamentos")}
                onSelect={setSelectedOcorrencia}
                value={selectedOcorrencia}
            />
            <DropdownComponent2
                data={areas.map(area => ({ label: area.desc_area, value: area.area_id }))}  
                label="Áreas"
                onSelect={setSelectedArea}
                value={selectedArea}
            />
            {/* <PhotoPhorm title="Fotos dos avistamentos" /> */}

            <ScrollView>   
                <Button 
                    title={t("adicionar")}
                    type="PRIMARY"
                    onPress={handleAddOcorrencia}
                />
                
                <DataTable
                    title={t("avistamentos")}
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