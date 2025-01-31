import styled from "styled-components/native";

import { DefaultTheme } from "styled-components/native";

export const PhotoForm = styled.TouchableOpacity`
    width: 95%;
    margin: 10px;
    margin-right: 10px;

    background-color: ${({theme} : DefaultTheme) => theme.COLORS.WHITE};
    border-radius: 10px;

    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const TitlePhotoForm = styled.Text`
    font-size: 16px;
    color: ${({theme} : DefaultTheme) => theme.COLORS.BLACK};
    font-family: ${({theme} : DefaultTheme) => theme.FONT_FAMILY.BOLD};
`