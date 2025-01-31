import styled from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    min-height: 50px;
    max-height: 70px;

    justify-content: center;
    align-items: center;

    background-color: ${({theme} : DefaultTheme) => theme.COLORS.TEAL_700};
`

export const Title = styled.Text`
    font-size: 20px;
    color: ${({theme} : DefaultTheme) => theme.COLORS.WHITE};
    text-align: center;
`