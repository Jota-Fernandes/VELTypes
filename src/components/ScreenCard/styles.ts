import styled from "styled-components/native";
import { DefaultTheme } from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons/';

export const Container = styled.TouchableOpacity`
    background-color: ${({ theme }: DefaultTheme) => theme.COLORS.GRAY_50};
    width: 156px;
    height: 156px;
    margin: 10px;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
`;
export const Title = styled.Text`
    font-size: 16px;
    color: ${({ theme }: DefaultTheme) => theme.COLORS.GRAY_500_MUTED};
    font-family: ${({ theme }: DefaultTheme) => theme.FONT_FAMILY.BOLD};
    text-align: center;
`

export const Icon = styled(MaterialIcons).attrs(({theme} : DefaultTheme) => ({
    size: 50,
    color: theme.COLORS.TEAL_700,
}))`
`;
