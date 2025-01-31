import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";

import { AuthProvider } from "src/context/AuthContext";
import { RoteiroProvider } from "src/context/RoteirosContext";

import { Routes } from "@routes/index";

export default function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RoteiroProvider>
          <Routes/>
          <StatusBar
            barStyle="light-content"
            backgroundColor="black"
          />      
        </RoteiroProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
