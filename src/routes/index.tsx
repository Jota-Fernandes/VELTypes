import { useContext } from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "@screens/Login";

import { AuthContext } from "src/context/AuthContext";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const {COLORS } = useTheme();
    const { signed } = useContext(AuthContext);

    return (
        <View style={{flex: 1, backgroundColor: COLORS.GRAY_50}}>
            <NavigationContainer>
                {signed? <AppRoutes /> : <Login />}
            </NavigationContainer>
        </View>
    );
}