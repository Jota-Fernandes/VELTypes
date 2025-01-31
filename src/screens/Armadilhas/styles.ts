import styled from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }: DefaultTheme) => theme.COLORS.GRAY_50};
`;

export const Title = styled.Text`
    font-size: 24px;
    color: ${({ theme }: DefaultTheme) => theme.COLORS.WHITE};
`;

export const TitleHeader = styled.View`
    width: 100%;
    background-color: ${({ theme }: DefaultTheme) => theme.COLORS.GRAY_500_MUTED};
`

export const Heading = styled.Text`
    font-family: ${({ theme }: DefaultTheme) => theme.FONT_FAMILY.BOLD};
    color: ${({ theme }: DefaultTheme) => theme.COLORS.GRAY_500_MUTED};

    margin: 30px 30px 0 30px;
    font-size: 19px;
`

export const SubForm = styled.View`
    width: 99%px;
    height: 50px;

    border-color: black;

    border-width: 1px;

    border-radius: 13px;
    align-items: center;

    margin: 0 10px 0 10px;

    flex-direction: row;
`
