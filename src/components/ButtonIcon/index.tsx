import { TouchableOpacityProps } from "react-native";
import { Container, Icon} from "./styles";
import {MaterialIcons} from '@expo/vector-icons'

type Props = TouchableOpacityProps & { 
    icon: keyof typeof MaterialIcons.glyphMap;
}

export function ButtonIcon({icon, ...rest} : Props) {
    return(
        <Container>
           <Icon name={icon} {...rest}/>
        </Container>
    )
}