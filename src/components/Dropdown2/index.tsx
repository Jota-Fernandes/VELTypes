import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type Props = {
  data: { label: string; value: string }[];  
  label: string;  
  onSelect: (label: string, value: string) => void;  // Mantendo a ordem correta
  value: string | null;  
}

export const DropdownComponent2 = ({ data, label, onSelect, value }: Props) => {
  const [isOpen, setIsOpen] = useState(false);  // Controle da visibilidade do dropdown

  const handleSelect = (item: { label: string, value: string }) => {
    console.log('value: ', value)
    onSelect(item.label, item.value);
    setIsOpen(false);  // Fecha o dropdown após seleção
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)}  
      >
        <Text style={styles.selectedText}>
          {value ? value : label}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect(item)}  // Chama a função handleSelect ao clicar
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 10,
    marginLeft: 10,
    height: 50,
    justifyContent: 'center',
  },
  selectedText: {
    fontSize: 16,
    color: '#000',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});
