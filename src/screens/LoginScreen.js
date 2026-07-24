import { View, Text, StyleSheet, TextInput, TouchableOpacity,
   KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constant/colors'
import AvatarBadge from '../components/AvatarBadge'
import BottomWave from '../components/BottomWave'

const schema = yup.object({
  email: yup.string().required('This field is required'),
  password: yup.string().required('Password is required'),
})

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data) => {
    // TODO(backend): call auth/login with { email, password }
    // then navigate to "Tabs" on success
    console.log('Login form values', data)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign in</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Hello there, sign in to continue</Text>

        <AvatarBadge iconName="lock-closed" />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Text Input"
              placeholderTextColor={colors.textGray}
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textGray}
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomWave />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.gradientEnd, paddingTop: 60, paddingBottom: 90, paddingHorizontal: 20 },
  backButton: { marginRight: 12 },
  headerTitle: { color: colors.white, fontSize: 18, fontWeight: '600' },
  card: { flex: 1, marginTop: -60, backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 24, paddingTop: 30 },
  title: { fontSize: 22, fontWeight: '700', color: colors.textDark },
  subtitle: { fontSize: 13, color: colors.textGray, marginTop: 4 },
  input: { backgroundColor: colors.inputBg, borderRadius: 10, borderWidth: 1, borderColor: colors.inputBorder, paddingHorizontal: 16, paddingVertical: 14, marginTop: 14, color: colors.textDark },
  errorText: { color: colors.accentCoral, fontSize: 12, marginTop: 4 },
  forgotText: { color: colors.textGray, fontSize: 12, textAlign: 'right', marginTop: 10 },
  signInButton: { backgroundColor: colors.primaryLight, borderRadius: 10, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  signInButtonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  footerText: { color: colors.textGray, fontSize: 13 },
  footerLink: { color: colors.primaryLight, fontSize: 13, fontWeight: '600' },
})

export default LoginScreen