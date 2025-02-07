import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";

import { AuthProvider } from "src/context/AuthContext";
import { RoteiroProvider } from "src/context/RoteirosContext";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "@routes/app.routes";

import { Routes } from "@routes/index";

export default function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RoteiroProvider>
          <NavigationContainer>
            <AppRoutes/>
          </NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor="black"
          />      
        </RoteiroProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
