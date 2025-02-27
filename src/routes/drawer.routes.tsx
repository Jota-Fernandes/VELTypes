import { createDrawerNavigator } from "@react-navigation/drawer";
import { Configuracoes } from "@screens/Configuracoes";
import { ServicosExecutados } from "@screens/ServicosExecutados";
import { Servicos } from "@screens/Servicos";

import { CustomDrawerContent } from "@components/CustomDrawer";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
const { Navigator, Screen } = createDrawerNavigator();

export function DrawerNavigator(props: any) {
    const {t} = useTranslation();

    return (
        <Navigator 
            drawerContent={(props) => <CustomDrawerContent {...props} />} 
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#F0EFF4",
                },
                headerTitleAlign: "center", // Centraliza o título
                headerRight: () => (
                    <View style={{ marginRight: 15 }}>
                        <MaterialIcons name="wifi" size={24} color="black" />
                    </View>
                ),
            }}
        >
            <Screen 
                name="Servico" 
                component={Servicos} 
                options={{ title: t('servicos') }} 
            />
            <Screen 
                name="Configurações" 
                component={Configuracoes} 
                options={{ title: t('configurações') }} 
            />
            <Screen 
                name="ServiçosExecutados" 
                component={ServicosExecutados} 
                options={{ title: t('servicos executados') }} 
            />
        </Navigator>
    );
}
