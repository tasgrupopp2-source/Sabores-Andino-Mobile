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

import styles, { AUTH_IMAGES } from '../styles/authStyles';
import { colors } from '../config/theme';

export default function SignUp({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSignUp = () => {
    navigation.replace('Home');
  };

  const renderEye = (visible, onPress) => (
    <TouchableOpacity style={styles.eyeButton} onPress={onPress}>
      <View style={{ position: 'relative' }}>
        <Image source={AUTH_IMAGES.ojo} style={styles.eyeIcon} />
        {!visible && (
          <View
            style={{
              position: 'absolute',
              top: 9, left: -2,
              width: 28, height: 2,
              backgroundColor: colors.gray,
              transform: [{ rotate: '-45deg' }],
              borderRadius: 1,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={AUTH_IMAGES.background}
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
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backTextDark}>{'‹'}</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Únete a Sabores Andinos</Text>
            <Text style={styles.subtitle}>
              Gestioná tus especias con excelencia.
            </Text>

            {/* ── Nombre ──────────────────────────────────── */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>NOMBRE</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === 'nombre' && styles.inputWrapperFocused,
                ]}
              >
                <Image
                  source={AUTH_IMAGES.usuario}
                  style={[
                    styles.inputIcon,
                    focusedField === 'nombre' && styles.inputIconFocused,
                  ]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Juan"
                  placeholderTextColor={colors.gray}
                  value={nombre}
                  onChangeText={setNombre}
                  onFocus={() => setFocusedField('nombre')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* ── Apellido ────────────────────────────────── */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>APELLIDO</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === 'apellido' && styles.inputWrapperFocused,
                ]}
              >
                <Image
                  source={AUTH_IMAGES.usuario}
                  style={[
                    styles.inputIcon,
                    focusedField === 'apellido' && styles.inputIconFocused,
                  ]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Pérez"
                  placeholderTextColor={colors.gray}
                  value={apellido}
                  onChangeText={setApellido}
                  onFocus={() => setFocusedField('apellido')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* ── Correo ──────────────────────────────────── */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CORREO ELECTRÓNICO</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === 'correo' && styles.inputWrapperFocused,
                ]}
              >
                <Image
                  source={AUTH_IMAGES.correo}
                  style={[
                    styles.inputIcon,
                    focusedField === 'correo' && styles.inputIconFocused,
                  ]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="usuario@saborandino.com"
                  placeholderTextColor={colors.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={correo}
                  onChangeText={setCorreo}
                  onFocus={() => setFocusedField('correo')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* ── Contraseña ──────────────────────────────── */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CONTRASEÑA</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === 'password' && styles.inputWrapperFocused,
                ]}
              >
                <Image
                  source={AUTH_IMAGES.candado}
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
                {renderEye(showPassword, () => setShowPassword(!showPassword))}
              </View>
            </View>

            {/* ── Confirmar Contraseña ─────────────────────── */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CONFIRMAR CONTRASEÑA</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === 'confirm' && styles.inputWrapperFocused,
                ]}
              >
                <Image
                  source={AUTH_IMAGES.candado}
                  style={[
                    styles.inputIcon,
                    focusedField === 'confirm' && styles.inputIconFocused,
                  ]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Repetí tu contraseña"
                  placeholderTextColor={colors.gray}
                  secureTextEntry={!showConfirm}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                />
                {renderEye(showConfirm, () => setShowConfirm(!showConfirm))}
              </View>
            </View>

            {/* ── Botón Registrarse ────────────────────────── */}
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={handleSignUp}
            >
              <Text style={styles.primaryButtonText}>Registrarse</Text>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>

            {/* ── Link a Login ─────────────────────────────── */}
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>
                ¿Ya tenés una cuenta?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkHighlight}>Inicia Sesión</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.legalText, { color: colors.gray }]}>
              AL REGISTRARTE ACEPTÁS NUESTROS TÉRMINOS Y CONDICIONES
            </Text>

            <View style={styles.footer}>
              <Image source={AUTH_IMAGES.logo} style={styles.footerLogo} />
              <Text style={styles.footerText}>
                © 2026 SABORES ANDINOS S.R.L.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
