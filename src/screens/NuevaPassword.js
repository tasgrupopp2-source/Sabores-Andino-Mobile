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

export default function NuevaPassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleConfirmar = () => {
    navigation.replace('Login');
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

            {/* ── Logo pequeño ─────────────────────────────── */}
            <Image
              source={AUTH_IMAGES.logo}
              style={styles.logoSmall}
              resizeMode="contain"
            />

            <Text style={styles.title}>Agregar contraseña nueva</Text>
            <Text style={styles.subtitle}>
              Creá una nueva contraseña para proteger tu cuenta de Sabores Andinos.
            </Text>

            {/* ── Contraseña nueva ─────────────────────────── */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CONTRASEÑA NUEVA</Text>
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

            {/* ── Requisitos de seguridad ──────────────────── */}
            <View style={[styles.reqBox, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
              <Text style={[styles.reqTitle, { color: colors.black }]}>REQUISITOS DE SEGURIDAD</Text>
              <Text style={[styles.reqItem, { color: colors.gray }, hasMinLength && styles.reqItemValid]}>
                • Al menos 8 caracteres
              </Text>
              <Text style={[styles.reqItem, { color: colors.gray }, hasUpperCase && styles.reqItemValid]}>
                • Una letra mayúscula
              </Text>
              <Text style={[styles.reqItem, { color: colors.gray }, hasNumber && styles.reqItemValid]}>
                • Un número
              </Text>
            </View>

            {/* ── Confirmar contraseña ─────────────────────── */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CONFIRMAR CONTRASEÑA NUEVA</Text>
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

            {/* ── Botón Confirmar ──────────────────────────── */}
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={handleConfirmar}
            >
              <Text style={styles.primaryButtonText}>Confirmar Contraseña</Text>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>

            {/* ── Cancelar ─────────────────────────────────── */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            {/* ── Footer ───────────────────────────────────── */}
            <View style={styles.footer}>
              <Image source={AUTH_IMAGES.logo} style={styles.footerLogo} />
              <Text style={styles.footerText}>
                SABOR ANDINO SECURE AUTHENTICATION
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
