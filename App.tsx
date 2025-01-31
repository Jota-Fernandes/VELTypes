import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";

import { AuthProvider } from "src/context/AuthContext";

import { Routes } from "@routes/index";

export default function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <AuthProvider>

        <Routes/>
        <StatusBar
          barStyle="light-content"
          backgroundColor="black"
        />      
      </AuthProvider>
    </ThemeProvider>
  );
}
