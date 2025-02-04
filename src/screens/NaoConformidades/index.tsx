
import { useState, useEffect } from "react";
import { HeaderScreen } from "@components/Header";
import { Button } from "@components/Button";
import { ButtonForm  } from "@components/Button/styles";
import { PhotoPhorm } from "@components/PhotoPhorm";
import { DataTable } from "@components/DataTable";
import { ScrollView, Alert } from "react-native";
import { Container, Cell, Row } from "./styles";
import { CustomCheckbox } from "@components/Checkbox";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { DropdownComponent2 } from "@components/Dropdown2";
import { getRealm } from "src/database/realm";

type NaoConformidadeRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">

  const registrada = [
    { label: '-- Registrada --', value: '0' },
    { label: 'SIM', value: '1' },
    { label: 'NÃO', value: '2' },
  ];

  const responsavel = [
    { label: '-- Responsável --', value: '0' },
    { label: 'CLIENTE', value: '1' },
    { label: 'EMPRESA', value: '2' },
  ];

  const prazo = [
    { label: '-- Prazo -- ', value: '0' },
    { label: 'IMEDIATO', value: '1' },
    { label: '2 MESES', value: '2' },
    { label: '3 MESES', value: '3' },
  ];

export function NaoConformidades() {
    const navigation = useNavigation();
    const route = useRoute<NaoConformidadeRouteProp>();
    const {roteiro, generalData} = route.params;
    const [areas, setAreas] = 
    useState<Array<{
        area_id: string; 
        desc_area: string;
    }>>([]);
    const [naoConformidade, setNaoConformidade] = 
    useState<Array<{
        nc_id: string;
        desc_nc: string;
    }>>([]);
    const [medidasCorretivas, setMedidasCorretivas] = 
    useState<Array<{
        mc_id: string;
        desc_mc: string;
    }>>([]);
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedNaoConformidade, setSelectedNaoConformidade] = useState("");
    const [selectedRegistrada, setSelectedRegistrada] = useState("");
    const [selectedResponsavel, setSelectedResponsavel] = useState("");
    const [selectedMedidasCorretivas, setSelectedMedidasCorretivas] = useState("");
    const [selectedPrazo, setSelectedPrazo] = useState("");

    const [renderedItems, setRenderedItems] = useState<any[]>([]);
    const [valueRendered, setValueRendered] = useState<any[]>([]);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    function toggleSelection(id: string) {
        setSelectedItems(prevSelected => 
            prevSelected.includes(id) 
                ? prevSelected.filter(itemId => itemId !== id)  // Remove se já estiver selecionado
                : [...prevSelected, id]  // Adiciona se não estiver selecionado
        );
    }

    function renderNaoConformidade(novaNaoConformidade: any) {
        return (
            <ScrollView horizontal={true} key={novaNaoConformidade.id}>
                <Row>
                    <CustomCheckbox  onPress={() => toggleSelection(novaNaoConformidade.id)}/>
                    <Cell>{novaNaoConformidade.area}</Cell>
                    <Cell>{novaNaoConformidade.nc}</Cell>
                    <Cell>{novaNaoConformidade.registrada}</Cell>
                    <Cell>{novaNaoConformidade.responsavel}</Cell>
                    <Cell>{novaNaoConformidade.medidasCorretivas}</Cell>
                    <Cell>{novaNaoConformidade.prazo}</Cell>
                </Row>
            </ScrollView>
        );
    }

    function handleAddNaoConformidade() {
        if (!selectedArea || !selectedNaoConformidade || !selectedRegistrada ||
            !selectedResponsavel || !selectedMedidasCorretivas || !selectedPrazo) {
            alert("Preencha todos os campos!");
            return;
        }

        const novaNaoConformidade = {
            id: Date.now().toString(),    // Gerando um ID único
            roteiro_id: roteiro.roteiro_de_servico_id,  // Criando um ID único
            area: selectedArea,
            naoConformidade: selectedNaoConformidade,
            registrada: selectedRegistrada,
            responsavel: selectedResponsavel,
            medidasCorretivas: selectedMedidasCorretivas,
            prazo: selectedPrazo,
        };

        // Atualiza o estado com o novo item gerado
        setRenderedItems(prevState => [...prevState, renderNaoConformidade(novaNaoConformidade)]);
        setValueRendered([...valueRendered, novaNaoConformidade]);

        // Limpa os campos após adicionar o item
        setSelectedArea("");
        setSelectedNaoConformidade("");
        setSelectedRegistrada("");
        setSelectedResponsavel("");
        setSelectedMedidasCorretivas("");
        setSelectedPrazo("");
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
                    const existe = realm.objects("NaoConformidade").filtered(`id == '${item.id}'`).length > 0;
                    if (!existe) {
                        realm.create("NaoConformidade", {
                            id: Date.now().toString(),
                            roteiro_id: roteiro.roteiro_de_servico_id,
                            area: item.area,
                            naoConformidade: item.naoConformidade,
                            registrada: item.registrada,
                            responsavel: item.responsavel,
                            medidasCorretivas: item.medidasCorretivas,
                            prazo: item.prazo,
                        });
                    }
                });
            });

            Alert.alert("Sucesso", "As não conformidades foram salvas com sucesso!");
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
                    const itemToDelete = realm.objects("NaoConformidade").filtered(`id == '${id}'`);
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
            const listNaoConformidades = generalData.NaoConformidades.map((item: any, index: number) => ({
                nc_id: item.nc_id,
                desc_nc: item.desc_nc,
            }));
            setNaoConformidade([{ nc_id: '', desc_nc: 'Não Conformidade' }, ...listNaoConformidades]);

            const listMedidasCorretivas = generalData.MedidasCorretivas.map((item: any, index: number) => ({
                mc_id: item.mc_id,
                desc_mc: item.desc_mc,
            }));
            setMedidasCorretivas([{ mc_id: '', desc_mc: 'Medidas Corretivas' }, ...listMedidasCorretivas]);
        }

    }, [roteiro, generalData]);

    useEffect(() =>{
        async function loadNaoConformidades() {
            try {
                const realm = await getRealm();
                const storedNaoConformidades = realm.objects("NaoConformidade").filtered(`roteiro_id == '${roteiro.roteiro_de_servico_id}'`);

                const loadedItems = storedNaoConformidades.map((item: any) => ({
                    id: item.id,
                    area: item.area,
                    naoConformidade: item.naoConformidade,
                    registrada: item.registrada,
                    responsavel: item.responsavel,
                    medidasCorretivas: item.medidasCorretivas,
                    prazo: item.prazo,
                }));

                setValueRendered(loadedItems);
                setRenderedItems(loadedItems.map(renderNaoConformidade));
            } catch (error) {
                console.error("Erro ao carregar dados do banco:", error);
            }
        }
        loadNaoConformidades();
    }, [])

    return (
        <Container>
            <HeaderScreen title="Não Conformidades" />
                <DropdownComponent2
                    data={areas.map(area => ({ label: area.desc_area, value: area.area_id }))} 
                    label="Áreas"
                    onSelect={setSelectedArea}
                    value={selectedArea}
                />
                <DropdownComponent2 
                    data={naoConformidade.map(nc => ({ label: nc.desc_nc, value: nc.nc_id }))} 
                    label="Não conformidade"
                    onSelect={setSelectedNaoConformidade}
                    value={selectedNaoConformidade}
                />
                <DropdownComponent2
                    data={registrada}
                    label="Registrada"
                    onSelect={setSelectedRegistrada}
                    value={selectedRegistrada}
                />
                <DropdownComponent2 
                    data={responsavel}
                    label="Responsável"
                    onSelect={setSelectedResponsavel}
                    value={selectedResponsavel}
                />
                <DropdownComponent2
                    data={medidasCorretivas.map(mc => ({ label: mc.desc_mc, value: mc.mc_id }))} 
                    label="Medidas Corretivas" 
                    onSelect={setSelectedMedidasCorretivas}
                    value={selectedMedidasCorretivas}
                />
     
                <DropdownComponent2
                    data={prazo}
                    label="Prazo"
                    onSelect={setSelectedPrazo}
                    value={selectedPrazo}
                />

                <PhotoPhorm title="Fotos das Não Conformidades"/>

                <Button 
                    onPress={handleAddNaoConformidade}
                    title="Adicionar" 
                    type="PRIMARY"
                />
                
                <ScrollView>
                    <DataTable onPress={removeRow}/>
                    {renderedItems}
                </ScrollView>

                <ButtonForm>
                    <Button 
                        title="Voltar" 
                        type="SECONDARY"
                        onPress={() => navigation.goBack()}
                    />

                    <Button 
                        onPress={handleFinishService} 
                        title="Finalizar" 
                        type="TERTIARY"
                    />
                </ButtonForm>
        </Container>
    )
}