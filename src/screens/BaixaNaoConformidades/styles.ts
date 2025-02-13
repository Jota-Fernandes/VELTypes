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

