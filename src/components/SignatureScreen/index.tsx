
import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native'
// import SignatureCapture from 'react-native-signature-capture'
// import Orientation from 'react-native-orientation'
import SignatureScreen from "react-native-signature-canvas"


export default function SignaturePad({ route, navigation } : any) {
    const refsignature = useRef(null)
    const [signature, setsignature] = useState([])

    const saveSign = () => {
        if (route.params.picture) {
            Alert.alert(
                "Já existe uma assinatura",
                "Substituir Assinatura?",
                [
                    {
                        text: "Não",
                        onPress: () => {
                            navigation.goBack()
                        },
                        style: "cancel"
                    },
                    {
                        text: "Sim",
                        onPress: () => {
                            navigation.goBack()
                        }
                    }
                ]
            )
        } else {
            navigation.goBack()

        }
    }


    return (
        <>
            <View style={{ flex: 1, flexDirection: "column", marginTop: "50%"}}>
             
                <SignatureScreen
                    ref={refsignature}
                    autoClear={true}
                />
            </View>
            <View style={{flex: 1, flexDirection: "row" }}>
                <TouchableHighlight style={styles.buttonStyle}
                    onPress={() => { saveSign() }} >
                    <Text>Salvar</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonStyle}>
                    <Text>Limpar</Text>
                </TouchableHighlight>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});
