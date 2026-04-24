import React, {useState, useCallback} from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import {getTasks, deleteTask} from '../storage/Taskstorage';
import {COLORS} from '../utils/constants';

const HomeScreen = ({navigation}: any) => {
  const [tasks, setTasks] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
      };
      loadTasks();
    }, []),
  );

  const handleDelete = async (id: string) => {
    const updated = await deleteTask(id);
    if (updated) {
      setTasks(updated);
    }
  };

  const handleEdit = (task: any) => {
    navigation.navigate('AddEditTask', {task});
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5FA]">
      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-[#2D2D3A]">Mi agenda personal</Text>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TaskCard
            task={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={tasks.length === 0 ? {flex: 1} : undefined}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddEditTask', {task: null})}
        className="absolute bottom-8 right-6 w-14 h-14 rounded-full items-center justify-center"
        style={{
          backgroundColor: COLORS.primary,
          shadowOpacity: 0.3,
          shadowRadius: 5,
          shadowColor: COLORS.primary,
          elevation: 5,
        }}>
        <Icon name="plus" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
