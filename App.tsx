import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';


import { styles } from './styles';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvaiableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map (type => LocalAuthentication.AuthenticationType[type]));
  }

  async function handleAuthentication(){
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometricEnrolled) {
      return Alert.alert('Login', 'Nenhuma biometria encontrada. Por favor, cadastre no dispositivo!');
    }


    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida'
    });


    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvaiableAuthentication();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff'}}>
        Usuário conectado: { isAuthenticated ? 'Sim' : 'Não'}
      </Text>
      <Button 
          title="Entrar" 
          onPress={handleAuthentication}
      />
    </View>
  );
}

