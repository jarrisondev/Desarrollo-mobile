import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.label}>Titulo</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Escribe el titulo de la tarea"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text style={styles.label}>Prioridad</Text>
      <View style={styles.priorityContainer}>
        {priorityKeys.map((key) => {
          const p = PRIORITY[key];
          const isSelected = priority === key;
          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.priorityButton,
                {borderColor: p.color},
                isSelected && {backgroundColor: p.color},
              ]}
              onPress={() => setPriority(key)}>
              <Icon
                name={p.icon}
                size={16}
                color={isSelected ? '#FFF' : p.color}
              />
              <Text
                style={[
                  styles.priorityText,
                  {color: isSelected ? '#FFF' : p.color},
                ]}>
                {p.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>
          {existingTask ? 'Actualizar' : 'Guardar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    gap: 6,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddEditTaskScreen;
