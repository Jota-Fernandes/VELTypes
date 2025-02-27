import styled, {css} from "styled-components/native";

import { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.GRAY_50};
`

export const HeaderTable = styled.View`
    width: 100%;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.TEAL_700};
    flex-direction: row;
    height: 50px;
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`

export const TitleHeader = styled.Text`
    font-size: 20px;
    color: ${({theme} : DefaultTheme) => theme.COLORS.WHITE};
`

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    min-height: 50px;
    max-height: 80px;
    padding: 20px;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.WHITE};
    border: 1px;
    align-items: center;
`

export const Cell = styled.Text`
    font-family: ${({theme} : DefaultTheme) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme} : DefaultTheme) => theme.COLORS.GRAY_500_MUTED};
    font-size: 15px;
    margin-right: 10px;
`

export const NumbersOfRow = styled.Text`
    ${({theme,} :  DefaultTheme) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.WHITE};
    `};
`