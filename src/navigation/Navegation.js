import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importamos todas las pantallas
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import RecuperarPassword from '../screens/RecuperarPassword';
import VerificarCorreo from '../screens/VerificarCorreo';
import NuevaPassword from '../screens/NuevaPassword';
import Home from '../screens/Home';
import GestionProductos from '../screens/GestionProductos';
import Perfil from '../screens/Perfil';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    // NavigationContainer es el contenedor principal de toda la navegación
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }} // Ocultamos el header por defecto
      >
        {/* Pantallas de inicio */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* Flujo de recuperación de contraseña */}
        <Stack.Screen name="RecuperarPassword" component={RecuperarPassword} />
        <Stack.Screen name="VerificarCorreo" component={VerificarCorreo} />
        <Stack.Screen name="NuevaPassword" component={NuevaPassword} />

        {/* Pantallas principales (post login) */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GestionProductos" component={GestionProductos} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
