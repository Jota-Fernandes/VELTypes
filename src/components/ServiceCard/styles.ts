import styled, { css } from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    min-height: 90px;
    max-height: 90px;

    margin-top: 10px;

    background-color: ${({ theme}: DefaultTheme) => theme.COLORS.WHITE};
    align-items: center;

    padding: 5px;
    border-radius: 10px;
    flex-direction: row;
`

export const TitleContainer = styled.View`
    margin-left: 10px;
`

export const Title = styled.Text`

    ${({theme} : DefaultTheme) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLORS.BLACK};
        font-size: ${theme.FONT_SIZE.MD}px;
    `}  

`

export const Subtitle = styled.Text`

    ${({theme} : DefaultTheme) => css`
            font-family: ${theme.FONT_FAMILY.REGULAR};
            color: ${theme.COLORS.GRAY_500_MUTED};
            font-size: ${theme.FONT_SIZE.SM}px;
    `}  
`