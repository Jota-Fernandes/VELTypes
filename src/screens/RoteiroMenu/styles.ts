import styled from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}: DefaultTheme) => theme.COLORS.GRAY_50};
    align-items: center;
    justify-content: center;
`;

export const Content = styled.View`

    flex-wrap: wrap;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
`