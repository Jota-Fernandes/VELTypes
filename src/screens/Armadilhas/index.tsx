import React from "react";
import { Text, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Input } from "@components/Input";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PhotoPhorm } from "@components/PhotoPhorm";
import {Button} from "@components/Button";
import { ButtonForm } from "@components/Button/styles";
import { DropdownComponent2 } from "@components/Dropdown2";
import { Container, TitleHeader, Title, SubForm } from "./styles";
import { RouteProp } from "@react-navigation/native";
import { getRealm } from "src/database/realm";
import { useTranslation } from "react-i18next";

type ArmadilhaRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">;

export function Armadilha() {
    const route = useRoute<ArmadilhaRouteProp>();
    const { roteiro, armadilha, generalData } = route.params;

    const {t} = useTranslation();

    const [produtos, setProdutos] = useState<Array<{ nome_prod: string; prod_id: string }>>([]);
    //const [selectedProdutos, setSelectedProdutos] = useState("");
    
    const [elementos, setElementos] = useState<Array<{ nome: string; numElem: string }>>([]);
    const [statusList, setStatusList] = useState<Array<{ label: string; value: string; numElem: string }>>([]);
    const [acaoList, setAcaoList] = useState<Array<{ label: string; value: string; numElem: string }>>([]);
    const [ocorrenciaList, setOcorreciaList] = useState<Array<{ label: string; value: string }>>([]);

    const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: string }>({});
    const [selectedAcao, setSelectedAcao] = useState<{ [key: number]: string }>({});
    //const [selectedOco, setSelectedOco] = useState("");

    const [saveSuccess, setSaveSuccess] = useState(false); 
    const navigation = useNavigation();

    const getLabelById = (id: string, list: Array<{ label: string; value: string }>) => {
        const item = list.find(item => item.value === id);
        return item ? item.label : "";
    };

    const saveDataToRealm = async () => {
        try {
            const realm = await getRealm();
    
            realm.write(() => {
                let existingArmadilha = realm.objects<any>("Armadilhas").filtered(`armadilha_id == "${armadilha?.armadilha_id}"`)[0];
    
                if (!existingArmadilha) {
                    existingArmadilha = realm.create("Armadilhas", { armadilha_id: armadilha?.armadilha_id });
                }
    
                for (let i = 0; i < 6; i++) {
                    existingArmadilha[`SLOT${i + 1}_ACAO`] = selectedAcao[i] ?? "";
                    existingArmadilha[`SLOT${i + 1}_STATUS`] = selectedStatus[i] ?? "";
                }
            });

            setSaveSuccess(true); 
            Alert.alert("Éxito", "¡Guardados con éxito!");
        } catch (error) {
            console.error("Erro ao salvar no Realm:", error);
            setSaveSuccess(false);
            Alert.alert("Erro", "Erro ao salvar os dados.");
        } finally {
            navigation.navigate("MenuArmadilhas", {roteiro, generalData});
        }
    };

   /*  useEffect(() => {
        if (roteiro) {
            const listProdutos = roteiro.produtos.map((item: any) => ({
                prod_id: item.prod_id,
                nome_prod: item.nome_prod,
            }));

            setProdutos([...listProdutos]);
        }
    }, [roteiro]); */

    useEffect(() => {
        
        const armadilhaData = generalData.TiposArm.find(tipo => tipo.tipo_id === armadilha.tipo_de_armadilha_id);

        if (armadilhaData) {
            const elementosPreenchidos = Object.entries(armadilhaData)
                .slice(3, 9) // Pegando apenas elem1 a elem6
                .map(([_, value], index) => ({
                    nome: value as string,
                    numElem: (index + 1).toString(),
                }));

            setElementos(elementosPreenchidos);
        }

        if (generalData.StatusArm) {
            setStatusList(
                generalData.StatusArm
                    .map(status => ({
                        label: status.desc_status ?? "",
                        value: status.status_id ?? "",
                        numElem: status.num_elem ?? "",
                    }))
                    .filter(item => item.label && item.value)
            );
        }

        if (generalData.AcaoArm) {
            setAcaoList(
                generalData.AcaoArm
                    .map(acao => ({
                        label: acao.desc_acao ?? "",
                        value: acao.acao_id ?? "",
                        numElem: acao.num_elem ?? "",
                    }))
                    .filter(item => item.label && item.value)
            );
        }

        if (generalData.Ocorrencias) {
            setOcorreciaList(
                generalData.Ocorrencias
                    .map(status => ({
                        label: status.desc_oco ?? "",
                        value: status.oco_id ?? "",
                    }))
                    .filter(item => item.label && item.value)
            );
        }
    }, [armadilha, generalData]);

    useEffect(() => {
        const fetchDataFromRealm = async () => {
            try {
                const realm = await getRealm(); 
                
            
                const savedArmadilhaCollection = realm.objects<any>("Armadilhas").filtered(`armadilha_id == "${armadilha?.armadilha_id}"`);
                
                console.log("saved", savedArmadilhaCollection)
                if (savedArmadilhaCollection.length > 0) { 
                    const savedArmadilha = savedArmadilhaCollection[0]; 

    
                    const updatedStatus: any = {};
                    const updatedAcao: any = {};
    
                    // Preenche os campos de status e ação com os valores salvos
                    for (let i = 0; i < 6; i++) {
                        updatedStatus[i] = savedArmadilha[`SLOT${i + 1}_STATUS`] || "";
                        updatedAcao[i] = savedArmadilha[`SLOT${i + 1}_ACAO`] || "";
                    }
    
                    setSelectedStatus(updatedStatus);
                    setSelectedAcao(updatedAcao);
                }
            } catch (error) {
                console.error("Erro ao buscar dados no Realm:", error);
            }
        };
    
        fetchDataFromRealm();
    }, [armadilha?.armadilha_id]);

    return (
        <Container>
                <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 18 }}>
                    {t("armadilhas")} Nº {armadilha.numero_armadilha}
                </Text>
                <Text style={{ marginLeft: 20, fontSize: 18 }}>
                    {armadilha.nome_tipo_de_armadilha} ({armadilha.tipo_armadilha})
                </Text>
                <Text style={{ marginLeft: 20, fontSize: 18, marginBottom: 10 }}>
                    Setor: {armadilha.local}
                </Text>

                {elementos.length > 0 &&
                    elementos
                        .filter(elem => elem.nome !== "") // Filtra elementos vazios
                        .map((elem, index) => {
                            const filteredStatusList = [{ label: "", value: "" }, ...statusList.filter(status => status.numElem === elem.numElem)];
                            const filteredAcaoList = [{ label: "", value: "" }, ...acaoList.filter(acao => acao.numElem === elem.numElem)];

                            return (
                                <View key={index}>
                                    <TitleHeader>
                                        <Title>{elem.nome}</Title>
                                    </TitleHeader>
                                    <DropdownComponent2
                                        data={filteredStatusList}
                                        label={t("status")}
                                        onSelect={(label, value) => {
                                            setSelectedStatus(prev => ({ ...prev, [index]: value }));
                                        }}
                                        value={getLabelById(selectedStatus[index], filteredStatusList)}
                                    />

                                    <DropdownComponent2
                                        data={filteredAcaoList}
                                        label={t("acao")}
                                        onSelect={(label, value) => {
                                            setSelectedAcao(prev => ({ ...prev, [index]: value }));
                                        }}
                                        value={getLabelById(selectedAcao[index], filteredAcaoList)}
                                    />
                                </View>
                            );
                        })}

                <ButtonForm>
                    <Button 
                        onPress={() => navigation.goBack()} 
                        title={t("voltar")} 
                        type="SECONDARY" />
                    <Button 
                        title={t("salvar")}
                        type="PRIMARY" 
                        onPress={saveDataToRealm}
                    />
                </ButtonForm>
        </Container>
    );
}