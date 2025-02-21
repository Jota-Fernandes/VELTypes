import styled from "styled-components/native";

import { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.GRAY_50};
`

export const Title = styled.Text`
    font-size: 18px;
    color: ${({theme} : DefaultTheme) => theme.COLORS.GREEN_400};
    padding: 10px;
`

export const Content = styled.View`
    padding-right: 10px;
    padding-left: 10px;
`

export const Text = styled.Text`
    font-size: 16px;
`
export const SubForm = styled.View`
    width: 95%;
    height: 50px;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.WHITE};

    border-radius: 25px;
    align-items: center;

    margin: 0 10px 8px 10px;

    flex-direction: row;
`