import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles, { LOGIN_IMAGES } from '../styles/loginStyles';
import { colors } from '../config/theme';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ImageBackground
        source={LOGIN_IMAGES.background}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ── Logo ─────────────────────────────────────── */}
            <View style={styles.logoContainer}>
              <Image
                source={LOGIN_IMAGES.logo}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>
              Ingresá a tu cuenta para continuar
            </Text>

            {/* ── Campo: Correo ─────────────────────────────── */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Correo electrónico</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === 'email' && styles.inputWrapperFocused,
                ]}
              >
                <Image
                  source={LOGIN_IMAGES.correo}
                  style={[
                    styles.inputIcon,
                    focusedField === 'email' && styles.inputIconFocused,
                  ]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor={colors.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* ── Campo: Contraseña ─────────────────────────── */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === 'password' && styles.inputWrapperFocused,
                ]}
              >
                <Image
                  source={LOGIN_IMAGES.candado}
                  style={[
                    styles.inputIcon,
                    focusedField === 'password' && styles.inputIconFocused,
                  ]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Tu contraseña"
                  placeholderTextColor={colors.gray}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <View style={{ position: 'relative' }}>
                    <Image
                      source={LOGIN_IMAGES.ojo}
                      style={styles.eyeIcon}
                    />
                    {!showPassword && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 9,
                          left: -2,
                          width: 28,
                          height: 2,
                          backgroundColor: colors.gray,
                          transform: [{ rotate: '-45deg' }],
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* ── Olvidé contraseña ──────────────────────────── */}
            <View style={styles.forgotRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RecuperarPassword')}
              >
                <Text style={styles.forgotText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>

            {/* ── Botón Ingresar ─────────────────────────────── */}
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>INGRESAR</Text>
            </TouchableOpacity>

            {/* ── Link a Registro ─────────────────────────────── */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>¿No tenés cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={styles.registerLink}>Registrate</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
