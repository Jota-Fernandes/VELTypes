import { TouchableOpacity, View, Text, SafeAreaView, Image } from "react-native"
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useContext } from "react"
import { RoteirosContext } from "src/context/RoteirosContext"
import { useTranslation } from "react-i18next"
import { styles } from './styles'


export function CustomDrawerContent(props : any){
    const {t} = useTranslation();
    const {sincronizar} = useContext(RoteirosContext)

    return(
        <SafeAreaView style={{flex: 1, padding: 0}}>
            <Image 
                source={require('../../assets/bg_evolucao.jpg')}
                style={styles.sideMenuProfileIcon}
            />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View 
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    flex: 1
                }}>
                <TouchableOpacity onPress={sincronizar} style={styles.SyncButton}>
                    <Text style={styles.SyncButtonText}>SINCRONIZAR</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}