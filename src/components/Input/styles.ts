import {TextInput} from "react-native";
import styled, {css} from "styled-components/native";
import { DefaultTheme } from "styled-components/native";


export const Container = styled(TextInput)`
    flex: 1;
    
    min-height: 56px;
    max-height: 56px;

    border-radius: 8px;
    padding: 16px;
    
    ${({theme} : DefaultTheme) => css`

        color: ${theme.COLORS.BLACK};
        
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.MD}px;
    
    `}
`;

