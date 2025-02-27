import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import { styles } from "./styles";

export const LoadingModal: React.FC<{ visible: boolean }> = ({ visible }) => {
    return (
      <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#3A797A" />
          </View>
        </View>
      </Modal>
    );
  };

