import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PRIORITY, COLORS} from '../utils/constants';
import {Task} from '../utils/types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({task, onDelete, onEdit}: TaskCardProps) => {
  const priority = PRIORITY[task.priority] || PRIORITY.media;

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Tarea',
      'Esta seguro que desea eliminar?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete(task.id),
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-xl p-4 my-1.5 mx-4 border border-[#E8E8EE]"
      onPress={() => onEdit(task)}
      activeOpacity={0.7}>
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Icon name={priority.icon} size={16} color={priority.color} />
          <Text className="text-xs font-semibold ml-1" style={{color: priority.color}}>
            {priority.label}
          </Text>
        </View>
        <Text className="text-base font-medium text-[#2D2D3A]" numberOfLines={2}>
          {task.title}
        </Text>
        {task.description ? (
          <Text className="text-xs text-[#8E8E9A] mt-1" numberOfLines={1}>
            {task.description}
          </Text>
        ) : null}
        {(task.date || task.time) ? (
          <View className="flex-row items-center mt-1.5 gap-2">
            {task.date ? (
              <View className="flex-row items-center gap-1">
                <Icon name="calendar-outline" size={12} color={COLORS.textSecondary} />
                <Text className="text-xs text-[#8E8E9A]">{task.date}</Text>
              </View>
            ) : null}
            {task.time ? (
              <View className="flex-row items-center gap-1">
                <Icon name="clock-outline" size={12} color={COLORS.textSecondary} />
                <Text className="text-xs text-[#8E8E9A]">{task.time}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
      <TouchableOpacity
        className="p-2"
        onPress={handleDelete}
        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
        <Icon name="trash-can-outline" size={20} color={COLORS.danger} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TaskCard;
