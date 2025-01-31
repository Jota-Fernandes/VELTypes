import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RoteiroMenu } from "@screens/RoteiroMenu";
import { MenuArmadilhas } from "@screens/MenuArmadilhas";
import { NaoConformidades } from "@screens/NaoConformidades";
import { Avistamentos } from "@screens/Avistamentos";
import { BaixaNaoConformidades } from "@screens/BaixaNaoConformidades";
import { DadosServicos } from "@screens/DadosDoServico";
import { ProdutosPorArea } from "@screens/ProdutosPorArea";
import { DadosReview } from "@screens/DadosReview";
import { Armadilha } from "@screens/Armadilhas";

import { DrawerNavigator } from "./drawer.routes";

const { Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen 
                name="Servicos" 
                component={DrawerNavigator}
            />
            <Screen 
                name="RoteiroMenu" 
                component={RoteiroMenu}
            />
            <Screen 
                name="MenuArmadilhas" 
                component={MenuArmadilhas}
            />
            <Screen 
                name="NaoConformidades" 
                component={NaoConformidades}
            />
            <Screen 
                name="Avistamentos" 
                component={Avistamentos}
            />
            <Screen 
                name="BaixaNaoConformidades" 
                component={BaixaNaoConformidades}
            />
            <Screen 
                name="DadosServicos" 
                component={DadosServicos}
            />
            <Screen 
                name="ProdutosPorArea" 
                component={ProdutosPorArea}
            />
            <Screen
                name="DadosReview" 
                component={DadosReview}
             />
            <Screen
                name="Armadilha" 
                component={Armadilha}
             />
        </Navigator>
    )
}