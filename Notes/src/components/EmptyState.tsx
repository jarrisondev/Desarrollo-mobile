import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/constants';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Icon name="calendar-blank-outline" size={100} color={COLORS.border} />
      <Text style={styles.title}>No hay tareas</Text>
      <Text style={styles.subtitle}>
        Dar click en el boton + para agregar una tarea
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default EmptyState;
