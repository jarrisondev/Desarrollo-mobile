import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../utils/constants';

const EmptyState = () => {
  return (
    <View className="flex-1 justify-center items-center px-8">
      <Icon name="calendar-blank-outline" size={100} color={COLORS.border} />
      <Text className="text-xl font-bold text-[#8E8E9A] text-center mt-4">
        No hay tareas
      </Text>
      <Text className="text-sm text-[#8E8E9A] text-center mt-2">
        Dar click en el boton + para agregar una tarea
      </Text>
    </View>
  );
};

export default EmptyState;
