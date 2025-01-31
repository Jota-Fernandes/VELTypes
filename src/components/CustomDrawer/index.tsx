import { TouchableOpacity, View, Text, SafeAreaView, Image } from "react-native"
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { styles } from './styles'


export function CustomDrawerContent(props : any){

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
                <TouchableOpacity style={styles.SyncButton}>
                    <Text style={styles.SyncButtonText}>SINCRONIZAR</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}