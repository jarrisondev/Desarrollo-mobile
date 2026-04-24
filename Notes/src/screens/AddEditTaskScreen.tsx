import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addTask, updateTask } from '../storage/Taskstorage';
import { PRIORITY, COLORS } from '../utils/constants';
import { Task, NewTask, Priority } from '../utils/types';

const priorityKeys = Object.keys(PRIORITY) as Priority[];

const AddEditTaskScreen = ({ route, navigation }: any) => {
  const existingTask: Task | null = route.params?.task ?? null;
  const isEditing = !!existingTask;

  const [task, setTask] = useState<NewTask>({
    title: existingTask?.title || '',
    description: existingTask?.description || '',
    date: existingTask?.date || '',
    time: existingTask?.time || '',
    priority: existingTask?.priority || 'media',
  });

  const updateField = <K extends keyof NewTask>(
    field: K,
    value: NewTask[K],
  ) => {
    setTask(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!task.title.trim()) {
      Alert.alert('Error', 'El titulo de la tarea es obligatorio');
      return;
    }

    const trimmedTask = {
      ...task,
      title: task.title.trim(),
      description: task.description.trim(),
    };

    if (isEditing) {
      await updateTask(existingTask.id, trimmedTask);
    } else {
      await addTask(trimmedTask);
    }

    navigation.goBack();
  };

  return (
    <ScrollView className="flex-1 bg-[#F5F5FA] p-5">
      <Text className="text-base font-semibold text-[#2D2D3A] mb-2 mt-4">
        Titulo
      </Text>
      <TextInput
        className="bg-white rounded-xl p-3.5 text-base text-[#2D2D3A] border border-[#E8E8EE]"
        value={task.title}
        onChangeText={v => updateField('title', v)}
        placeholder="Escribe el titulo de la tarea"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text className="text-base font-semibold text-[#2D2D3A] mb-2 mt-4">
        Descripcion
      </Text>
      <TextInput
        className="bg-white rounded-xl p-3.5 text-base text-[#2D2D3A] border border-[#E8E8EE]"
        value={task.description}
        onChangeText={v => updateField('description', v)}
        placeholder="Descripcion de la tarea"
        placeholderTextColor={COLORS.textSecondary}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      <Text className="text-base font-semibold text-[#2D2D3A] mb-2 mt-4">
        Fecha
      </Text>
      <TextInput
        className="bg-white rounded-xl p-3.5 text-base text-[#2D2D3A] border border-[#E8E8EE]"
        value={task.date}
        onChangeText={v => updateField('date', v)}
        placeholder="DD/MM/AAAA"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text className="text-base font-semibold text-[#2D2D3A] mb-2 mt-4">
        Hora
      </Text>
      <TextInput
        className="bg-white rounded-xl p-3.5 text-base text-[#2D2D3A] border border-[#E8E8EE]"
        value={task.time}
        onChangeText={v => updateField('time', v)}
        placeholder="HH:MM"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text className="text-base font-semibold text-[#2D2D3A] mb-2 mt-4">
        Prioridad
      </Text>
      <View className="flex-row gap-3">
        {priorityKeys.map(key => {
          const p = PRIORITY[key];
          const isSelected = task.priority === key;
          return (
            <TouchableOpacity
              key={key}
              className="flex-row items-center px-4 py-2.5 rounded-full border-2 gap-1.5"
              style={{
                borderColor: p.color,
                backgroundColor: isSelected ? p.color : 'transparent',
              }}
              onPress={() => updateField('priority', key)}
            >
              <Icon
                name={p.icon}
                size={16}
                color={isSelected ? '#FFF' : p.color}
              />
              <Text
                className="text-sm font-semibold"
                style={{ color: isSelected ? '#FFF' : p.color }}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        className="bg-[#6C63FF] rounded-xl p-4 items-center mt-8 mb-8"
        onPress={handleSave}
      >
        <Text className="text-white text-lg font-bold">
          {isEditing ? 'Actualizar' : 'Guardar'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddEditTaskScreen;
