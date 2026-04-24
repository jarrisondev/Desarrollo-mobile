import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { STORAGE_KEY } from '../utils/constants';
import { Task, NewTask } from '../utils/types';

export const getTasks = async (): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error al leer las tareas', error);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error al guardar las tareas', error);
    return false;
  }
};

export const addTask = async (task: NewTask): Promise<Task[] | null> => {
  try {
    const tasks = await getTasks();
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error al agregar la tarea', error);
    return null;
  }
};

export const updateTask = async (
  id: string,
  updatedFields: Partial<NewTask>,
): Promise<Task[] | null> => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updatedFields } : task,
    );
    await saveTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error al actualizar la tarea', error);
    return null;
  }
};

export const deleteTask = async (id: string): Promise<Task[] | null> => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    await saveTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error al eliminar la tarea', error);
    return null;
  }
};

export const deleteAllTasks = async (): Promise<Task[] | null> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.error('Error al eliminar todas las tareas', error);
    return null;
  }
};
