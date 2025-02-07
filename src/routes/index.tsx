import { useContext } from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "src/context/AuthContext";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const {COLORS } = useTheme();

    return (
        <View style={{flex: 1, backgroundColor: COLORS.GRAY_50}}>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </View>
    );
}