import styled, {DefaultTheme} from "styled-components/native";
import { TouchableOpacity } from "react-native";

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY' | 'TERTIARY'| 'QUATERNARY';

type Props = {
    type: ButtonTypeStyleProps;
}

const getBackgroundColor = (theme: DefaultTheme, type: ButtonTypeStyleProps) => {
    switch (type) {
        case 'PRIMARY':
            return theme.COLORS.GREEN_400;
        case 'SECONDARY':
            return theme.COLORS.RED_500;
        case 'TERTIARY':
            return theme.COLORS.BLUE_500;    
        default:
            return theme.COLORS.TEAL_700; 
    }
}

export const Container = styled(TouchableOpacity)<Props>`
    flex: 1;

    min-height: 56px;
    max-height: 56px;
    margin: 10px;

    background-color: ${({theme, type}: DefaultTheme) => getBackgroundColor(theme, type)};

    border-radius: 6px;

    justify-content: center;
    align-items: center;    
`

export const Title = styled.Text`
    font-size: ${({theme} : DefaultTheme) => theme.FONT_SIZE.MD}px;
    color: ${({theme} : DefaultTheme) => theme.COLORS.WHITE};
    font-family: ${({theme} : DefaultTheme) => theme.FONT_FAMILY.BOLD};
`

export const ButtonForm = styled.View`
    margin: 10px;
    margin-right: 10px;

    flex-direction: row;
    justify-content: space-between
`