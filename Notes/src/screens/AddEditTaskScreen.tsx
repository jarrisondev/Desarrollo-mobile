import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addTask, updateTask} from '../storage/Taskstorage';
import {PRIORITY, COLORS} from '../utils/constants';

const priorityKeys = Object.keys(PRIORITY) as Array<keyof typeof PRIORITY>;

const AddEditTaskScreen = ({route, navigation}: any) => {
  const existingTask = route.params?.task;
  const [title, setTitle] = useState(existingTask?.title || '');
  const [priority, setPriority] = useState<keyof typeof PRIORITY>(
    existingTask?.priority || 'media',
  );

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El titulo de la tarea es obligatorio');
      return;
    }

    if (existingTask) {
      await updateTask(existingTask.id, {title: title.trim(), priority});
    } else {
      await addTask({title: title.trim(), priority});
    }

    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-[#F5F5FA] p-5">
      <Text className="text-base font-semibold text-[#2D2D3A] mb-2 mt-4">Titulo</Text>
      <TextInput
        className="bg-white rounded-xl p-3.5 text-base text-[#2D2D3A] border border-[#E8E8EE]"
        value={title}
        onChangeText={setTitle}
        placeholder="Escribe el titulo de la tarea"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text className="text-base font-semibold text-[#2D2D3A] mb-2 mt-4">Prioridad</Text>
      <View className="flex-row gap-3">
        {priorityKeys.map((key) => {
          const p = PRIORITY[key];
          const isSelected = priority === key;
          return (
            <TouchableOpacity
              key={key}
              className="flex-row items-center px-4 py-2.5 rounded-full border-2 gap-1.5"
              style={{
                borderColor: p.color,
                backgroundColor: isSelected ? p.color : 'transparent',
              }}
              onPress={() => setPriority(key)}>
              <Icon
                name={p.icon}
                size={16}
                color={isSelected ? '#FFF' : p.color}
              />
              <Text
                className="text-sm font-semibold"
                style={{color: isSelected ? '#FFF' : p.color}}>
                {p.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        className="bg-[#6C63FF] rounded-xl p-4 items-center mt-8"
        onPress={handleSave}>
        <Text className="text-white text-lg font-bold">
          {existingTask ? 'Actualizar' : 'Guardar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEditTaskScreen;
