import styled from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

import {MaterialIcons} from '@expo/vector-icons/';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme} : DefaultTheme) => theme.COLORS.GRAY_50};
    padding: 10px;
`

export const Title = styled.View`
    flex-direction: row;
    width: 100%;
`

export const TextTitle = styled.Text`
    margin: 25px 0 0 5px;
    font-family: ${({theme} : DefaultTheme) => theme.FONT_FAMILY.REGULAR};
    font-size: 15px;
    color: ${({theme} : DefaultTheme) => theme.COLORS.GRAY_500_MUTED};
`

export const Icon = styled(MaterialIcons).attrs(({ theme } : DefaultTheme) => ({
    size: 20,
    color: theme.COLORS.TEAL_700,
    marginTop: 25,
    marginLeft: 10
}))`
`