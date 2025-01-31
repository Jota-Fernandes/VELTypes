import styled from "styled-components/native";

import { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.GRAY_50};
`

export const Content = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;


    padding: 10px;
    height: 50px;

    background-color: ${({theme} : DefaultTheme) => theme.COLORS.GRAY_500_MUTED};
`

export const Heading = styled.Text`
    flex: 1;
    font-family: ${({theme} : DefaultTheme) => theme.FONT_FAMILY.BOLD};
    color: ${({theme} : DefaultTheme) => theme.COLORS.WHITE};
    font-size: 19px;
`

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    min-height: 50px;
    max-height: 80px;
    padding: 10px;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.WHITE};
    border: 1px ${({theme} : DefaultTheme) => theme.COLORS.GRAY_50};
`

export const Cell = styled.Text`
    font-family: ${({theme} : DefaultTheme) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme} : DefaultTheme) => theme.COLORS.BLACK};
    font-size: 15px;
    text-align: left;

`
