import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddEditTaskScreen from '../screens/AddEditTaskScreen';
import {COLORS} from '../utils/constants';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: COLORS.primary},
          headerTintColor: '#FFF',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddEditTask"
          component={AddEditTaskScreen}
          options={({route}: any) => ({
            title: route.params?.task ? 'Editar Tarea' : 'Nueva Tarea',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
