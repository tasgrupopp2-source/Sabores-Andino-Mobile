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

export default function RecuperarPassword({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleEnviar = () => {
    navigation.navigate('VerificarCorreo', { email: correo });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

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
            {/* ── Logo grande ──────────────────────────────── */}
            <Image
              source={AUTH_IMAGES.logo}
              style={styles.logoBig}
              resizeMode="contain"
            />

            <Text style={styles.title}>RECUPERAR CUENTA</Text>
            <Text style={styles.subtitle}>
              Ingresá tu correo electrónico y te enviaremos las instrucciones
              para recuperar tu contraseña
            </Text>

            {/* ── Campo: Correo ─────────────────────────────── */}
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
                  placeholder="nombre@empresa.com"
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

            {/* ── Botón Enviar ──────────────────────────────── */}
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={handleEnviar}
            >
              <Text style={styles.primaryButtonText}>Enviar</Text>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>

            {/* ── Footer ───────────────────────────────────── */}
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
