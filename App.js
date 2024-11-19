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
import EditarPropriedade from './src/screens/editarPropriedade';
import EditarTalhao from './src/screens/talhoes/editarTalhao';
import ExcluirTalhao from './src/screens/talhoes/excluirTalhao';
import NovoTalhao from './src/screens/talhoes/novoTalhao';
import ConfirmaNovoTalhao from './src/screens/talhoes/confirmaNovoTalhao';
import GerenciamentoMaquina from './src/screens/maquinas/gerenciamentoMaquina';
import GerenciamentoMaquina2 from './src/screens/maquinas/gerenciamentoMaquina2';
import EditarMaquina from './src/screens/maquinas/editarMaquina';
import NovaMaquina from './src/screens/maquinas/novaMaquina';
import ExcluirMaquina from './src/screens/maquinas/excluirMaquina';
import GerenciamentoInsumos from './src/screens/insumos/gerenciamentoInsumos';
import GerenciamentoInsumos2 from './src/screens/insumos/gerenciamentoInsumos2';
import NovoInsumo from './src/screens/insumos/novoInsumo';
import EditarInsumo from './src/screens/insumos/editarInsumo';
import ExcluirInsumo from './src/screens/insumos/excluirInsumo';
import GerenciamentoCultura from './src/screens/cultura/gerenciamentoCultura';
import GerenciamentoCultura2 from './src/screens/cultura/gerenciamentoCultura2';
import NovaCultura from './src/screens/cultura/novaCultura';
import EditarCultura from './src/screens/cultura/editarCultura';
import ExcluirCultura from './src/screens/cultura/excluirCultura';
import GerenciamentoCaderno from './src/screens/caderno/gerenciamentoCaderno';
import GerenciamentoCaderno2 from './src/screens/caderno/gerenciamentoCaderno2';
import RegistroPraticas from './src/screens/caderno/registroPraticas';
import GerenciamentoSafra from './src/screens/safra/gerenciamentoSafra';
import GerenciamentoSafra2 from './src/screens/safra/gerenciamentoSafra2';
import NovaSafra from './src/screens/safra/novaSafra';
import EditarSafra from './src/screens/safra/editarSafra';
import ExcluirSafra from './src/screens/safra/excluirSafra';
import Qrcodescreen from './src/screens/qrcodescreen';
import TimelineScreen from './src/screens/TimelineScreen';

import { UserProvider } from './src/contexts/UserContext';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
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
            <Stack.Screen name="EditarPropriedade" component={EditarPropriedade} options={{ headerShown: false }} />
            <Stack.Screen name="EditarTalhao" component={EditarTalhao} options={{ headerShown: false }} />
            <Stack.Screen name="ExcluirTalhao" component={ExcluirTalhao} options={{ headerShown: false }} />
            <Stack.Screen name="NovoTalhao" component={NovoTalhao} options={{ headerShown: false }} />
            <Stack.Screen name="ConfirmaNovoTalhao" component={ConfirmaNovoTalhao} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoMaquina" component={GerenciamentoMaquina} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoMaquina2" component={GerenciamentoMaquina2} options={{ headerShown: false }} />
            <Stack.Screen name="EditarMaquina" component={EditarMaquina} options={{ headerShown: false }} />
            <Stack.Screen name="NovaMaquina" component={NovaMaquina} options={{ headerShown: false }} />
            <Stack.Screen name="ExcluirMaquina" component={ExcluirMaquina} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoInsumos" component={GerenciamentoInsumos} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoInsumos2" component={GerenciamentoInsumos2} options={{ headerShown: false }} />
            <Stack.Screen name="NovoInsumo" component={NovoInsumo} options={{ headerShown: false }} />
            <Stack.Screen name="EditarInsumo" component={EditarInsumo} options={{ headerShown: false }} />
            <Stack.Screen name="ExcluirInsumo" component={ExcluirInsumo} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoCultura" component={GerenciamentoCultura} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoCultura2" component={GerenciamentoCultura2} options={{ headerShown: false }} />
            <Stack.Screen name="NovaCultura" component={NovaCultura} options={{ headerShown: false }} />
            <Stack.Screen name="EditarCultura" component={EditarCultura} options={{ headerShown: false }} />
            <Stack.Screen name="ExcluirCultura" component={ExcluirCultura} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoCaderno" component={GerenciamentoCaderno} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoCaderno2" component={GerenciamentoCaderno2} options={{ headerShown: false }} />
            <Stack.Screen name="RegistroPraticas" component={RegistroPraticas} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoSafra" component={GerenciamentoSafra} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciamentoSafra2" component={GerenciamentoSafra2} options={{ headerShown: false }} />
            <Stack.Screen name="NovaSafra" component={NovaSafra} options={{ headerShown: false }} />
            <Stack.Screen name="EditarSafra" component={EditarSafra} options={{ headerShown: false }} />
            <Stack.Screen name="ExcluirSafra" component={ExcluirSafra} options={{ headerShown: false }} />
            <Stack.Screen name="Qrcodescreen" component={Qrcodescreen} options={{ headerShown: false }} />
            <Stack.Screen name="TimelineScreen" component={TimelineScreen} options={{ headerShown: false }} />




          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}
