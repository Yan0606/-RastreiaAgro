import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FirstScreen from './src/screens/firstScreen';
import CadastroAgricultor from './src/screens/cadastroAgricultor';
import CadastroPropriedade from './src/screens/cadastroPropriedade';
import Obrigado from './src/screens/obrigado';
import Login from './src/screens/login';
import Menu from './src/screens/menu';
import Gerenciamento from './src/screens/talhoes/gerenciamento';
import Gerenciamento2 from './src/screens/talhoes/gerenciamento2';
import MenuConfig from './src/screens/menuConfig';
import EditarPerfil from './src/screens/editarPerfil';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FirstScreen">
          <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CadastroAgricultor" component={CadastroAgricultor} options={{ headerShown: false }} />
          <Stack.Screen name="CadastroPropriedade" component={CadastroPropriedade} options={{ headerShown: false }} />
          <Stack.Screen name="Obrigado" component={Obrigado} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="Gerenciamento" component={Gerenciamento} options={{ headerShown: false }} />
          <Stack.Screen name="Gerenciamento2" component={Gerenciamento2} options={{ headerShown: false }} />
          <Stack.Screen name="MenuConfig" component={MenuConfig} options={{ headerShown: false }} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
