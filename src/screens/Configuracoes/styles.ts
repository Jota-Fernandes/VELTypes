import styled from "styled-components/native";

import { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.GRAY_50};
`
export const LanguageContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
`