import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, TextInput, ActivityIndicator, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { getRealm } from "src/database/realm"; // Supondo que você tenha essa função de conexão com Realm
import { useTranslation } from 'react-i18next';
import { HeaderScreen } from "@components/Header";
import { Container, Content, Heading, Row, Cell } from "./styles";
import { RoteiroSchemaType } from "src/database/schemas/RoteiroSchema";

type MenuArmadilhaRouteProp = RouteProp<ReactNavigation.RootParamList, "RoteiroMenu">;

export function MenuArmadilhas() {
    const route = useRoute<MenuArmadilhaRouteProp>();
    const { roteiro, generalData } = route.params;
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const {t} = useTranslation();
    const [armadilhas, setArmadilhas] = useState<Array<any>>([]);
    const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (roteiro && roteiro.armadilhas) {
            const listaArmadilhas = roteiro.armadilhas
                .map((item: any) => ({
                    numero_armadilha: item.numero_armadilha,
                    tipo_armadilha: item.nome_tipo_de_armadilha,
                    local: item.nome_tipo_de_area,
                    armadilha_id: item.armadilha_id,
                    tipo_de_armadilha_id: item.tipo_de_armadilha_id,
                    TIPO_DE_PRAGA_ID: item.TIPO_DE_PRAGA_ID,
                    area_id: item.area_id,
                    codigo_armadilha: item.codigo_armadilha,
                    complemento_area: item.complemento_area,
                    desc_armadilha: item.desc_armadilha,
                    nome_tipo_de_area: item.nome_tipo_de_area,
                    nome_tipo_de_armadilha: item.nome_tipo_de_armadilha,
                    sigla_armadilha: item.sigla_armadilha,
                }))
                .sort((a: any, b: any) => Number(a.numero_armadilha) - Number(b.numero_armadilha));

            setArmadilhas(listaArmadilhas);
        }
    }, [roteiro]);

    useEffect(() => {
        const fetchSavedStatus = async (roteiro_servico: any) => {
            try {
                const realm = await getRealm();

                const roteiro = realm.objectForPrimaryKey<RoteiroSchemaType>("Roteiro", roteiro_servico.roteiro_de_servico_id);

                if (!roteiro) {
                    console.log(`Nenhum roteiro encontrado`);
                    return [];
                }
                const storedArmadilhas = roteiro.armadilhas || [];

                const statusMap: Record<string, boolean> = {};

                // Busca todas as armadilhas salvas no banco
                /* const savedArmadilhas = realm.objects<any>("Armadilhas").filtered(
                    "roteiro_de_servico_id == $0",
                    roteiro.roteiro_de_servico_id
                );
                 */

                storedArmadilhas.forEach((savedArmadilha: any) => {
                    const hasStatus =
                        !!savedArmadilha.SLOT1_STATUS ||
                        !!savedArmadilha.SLOT2_STATUS ||
                        !!savedArmadilha.SLOT3_STATUS ||
                        !!savedArmadilha.SLOT4_STATUS ||
                        !!savedArmadilha.SLOT5_STATUS ||
                        !!savedArmadilha.SLOT6_STATUS;

                    statusMap[savedArmadilha.armadilha_id] = hasStatus

                });

                setSavedStatus(statusMap);
            } catch (error) {
                console.error("Erro ao buscar status no Realm:", error);
            } finally {
                setLoading(false);
            }
        };

        if (armadilhas.length > 0) {
            fetchSavedStatus(roteiro);
            
        }
    }, [armadilhas]);

    const filteredArmadilhas = armadilhas.filter(
        (item) =>
            item.numero_armadilha.includes(searchQuery) ||
            item.tipo_armadilha.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.local.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <Container>
                <HeaderScreen title={t("armadilhas")} />
                {/* Exibe o ActivityIndicator enquanto os dados são carregados */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#00f" />
                </View>
            </Container>
        );
    }

    return (
        <Container>
            <HeaderScreen title={t("armadilhas")} />
            <TextInput
                placeholder={`Buscar ${t("armadilhas")}...`}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ padding: 10, backgroundColor: "#fff", borderRadius: 8 }}
            />
            <Row style={{backgroundColor: "gray"}}>
                <Heading style={{ width: "10%" }}>Nº</Heading>
                <Heading style={{ width: "30%" }}>Código</Heading>
                <Heading style={{ width: "30%" }}>Tipo</Heading>
                <Heading style={{ width: "30%" }}>{t("local")}</Heading>
            </Row>
            <FlatList
                data={filteredArmadilhas}
                keyExtractor={(item) => item.armadilha_id}
                renderItem={({ item }) => {
                    const hasSavedStatus = savedStatus[item.armadilha_id] ?? false;

                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Armadilha", { roteiro, armadilha: item, generalData })
                            }
                            }
                        >
                            <Row style={{ backgroundColor: hasSavedStatus ? "#00ffee" : "#fbfbfb" }}>
                                <Cell style={{ width: "10%" }}>{item.numero_armadilha}</Cell>
                                <Cell style={{ width: "30%" }}>{item.codigo_armadilha}</Cell>
                                <Cell style={{ width: "30%" }}>{item.tipo_armadilha}</Cell>
                                <Cell style={{ width: "30%" }}>{item.local}</Cell>
                            </Row>
                        </TouchableOpacity>
                    );
                }}
            />
            <Content type="FOOTER">
                <TouchableOpacity onPress={() => navigation.navigate("RoteiroMenu", {roteiro, generalData})}>
                    <MaterialIcons name="arrow-back" size={33} color="#ffffff" />
                </TouchableOpacity>
              {/*   <TouchableOpacity>
                    <MaterialIcons name="map" size={33} color="#ffffff" />
                </TouchableOpacity> */}
               {/*  <TouchableOpacity>
                    <MaterialIcons name="qr-code-scanner" size={33} color="#ffffff" />
                </TouchableOpacity> */}
            </Content>
        </Container>
    );
}
