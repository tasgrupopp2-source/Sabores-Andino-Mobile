import React, { useState, useRef, useEffect } from 'react';
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

const CODE_LENGTH = 6;
const RESEND_SECONDS = 50;

export default function VerificarCorreo({ navigation, route }) {
  const email = route?.params?.email || 'correo@ejemplo.com';
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerificar = () => {
    navigation.navigate('NuevaPassword');
  };

  const handleResend = () => {
    setTimer(RESEND_SECONDS);
  };

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

            <Text style={styles.title}>Verificá tu correo</Text>
            <Text style={styles.subtitle}>
              Enviamos un código de 6 dígitos a{'\n'}
              <Text style={styles.emailHighlight}>{email}</Text>
            </Text>

            {/* ── Inputs de código ─────────────────────────── */}
            <View style={styles.codeRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={`code-${index}`}
                  ref={(ref) => { inputRefs.current[index] = ref; }}
                  style={[
                    styles.codeInput,
                    focusedIndex === index && styles.codeInputFocused,
                  ]}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                />
              ))}
            </View>

            {/* ── Botón Verificar ──────────────────────────── */}
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={handleVerificar}
            >
              <Text style={styles.primaryButtonText}>Verificar correo</Text>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>

            {/* ── Timer y reenvío ──────────────────────────── */}
            <Text style={styles.timerText}>¿No recibiste el código?</Text>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                Puedes reenviar en{' '}
                <Text style={styles.timerBold}>{timer}s</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.timerText, { color: colors.mountainBlue }]}>
                  Reenviar código
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('RecuperarPassword')}
            >
              <Text style={[styles.timerText, { color: colors.mountainBlue, marginTop: 10 }]}>
                Cambiar correo electrónico
              </Text>
            </TouchableOpacity>

            {/* ── Footer ───────────────────────────────────── */}
            <View style={styles.footer}>
              <Image source={AUTH_IMAGES.logo} style={styles.footerLogo} />
              <Text style={styles.footerText}>
                SABORES ANDINOS S.R.L.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
