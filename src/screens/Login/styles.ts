import styled from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`

export const Form = styled.View`
    flex: 1;
    padding: 15px;
`

export const SubForm = styled.View`
    width: 100%;
    height: 70px;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.WHITE};

    border-radius: 25px;
    align-items: center;

    margin-bottom: 15px;

    flex-direction: row;
`

export const Logo = styled.Image`
    width: 100%;
    height: 300px;
`

export const LanguageContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
`

export const LanguageTitle = styled.Text`
    font-size: 18px;
`