import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import {MaterialIcons} from '@expo/vector-icons/';
import { DefaultTheme } from 'styled-components/native'

export const Container = styled(TouchableOpacity)`
    width: 56px;
    height: 56px;

    justify-content: center;
    align-items: center;

    margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs(({ theme } : DefaultTheme) => ({
    size: 24,
    color: theme.COLORS.BLACK
}))``