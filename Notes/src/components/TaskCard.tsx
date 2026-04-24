import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PRIORITY, COLORS} from '../utils/constants';

interface Task {
  id: string;
  title: string;
  priority: keyof typeof PRIORITY;
}

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
    <TouchableOpacity style={styles.card} onPress={() => onEdit(task)} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Icon name={priority.icon} size={16} color={priority.color} />
          <Text style={[styles.priorityLabel, {color: priority.color}]}>
            {priority.label}
          </Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
        <Icon name="trash-can-outline" size={20} color={COLORS.danger} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  priorityLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  deleteButton: {
    padding: 8,
  },
});

export default TaskCard;
