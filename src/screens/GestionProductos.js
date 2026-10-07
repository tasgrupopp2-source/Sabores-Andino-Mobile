import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/theme';

export default function GestionProductos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Productos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, color: colors.black },
});
