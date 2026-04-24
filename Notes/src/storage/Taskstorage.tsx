import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../utils/constants';

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error al leer las tareas', error);
    return [];
  }
};

export const saveTasks = async (tasks: any[]) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error al guardar las tareas', error);
    return false;
  }
};

export const addTask = async (task: any) => {
  try {
    const tasks = await getTasks();
    const newTask = {...task, id: Date.now().toString(), createdAt: new Date().toISOString()};
    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error al agregar la tarea', error);
    return null;
  }
};

export const updateTask = async (id: string, updatedFields: any) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.map((task: any) =>
      task.id === id ? {...task, ...updatedFields} : task,
    );
    await saveTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error al actualizar la tarea', error);
    return null;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter((task: any) => task.id !== id);
    await saveTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error al eliminar la tarea', error);
    return null;
  }
};

export const deleteAllTasks = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.error('Error al eliminar todas las tareas', error);
    return null;
  }
};
