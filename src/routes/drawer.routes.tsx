import { createDrawerNavigator } from "@react-navigation/drawer";
import { Configuracoes } from "@screens/Configuracoes";
import { ServicosExecutados } from "@screens/ServicosExecutados";
import { Servicos } from "@screens/Servicos";

import { CustomDrawerContent } from "@components/CustomDrawer";

const {Navigator, Screen } = createDrawerNavigator();

export function DrawerNavigator(props : any) {
    return(
        <Navigator 
            drawerContent={props => <CustomDrawerContent {...props}/>} 
            screenOptions={{
                headerStyle:{
                    backgroundColor: '#F0EFF4',
                }
            }}
        >
            <Screen name="Serviços" component={Servicos} />
            <Screen name="Configurações" component={Configuracoes} />
            <Screen name="ServiçosExecutados" component={ServicosExecutados} />
        </Navigator>
    )
}