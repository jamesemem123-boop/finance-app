import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constant/colors'
import AvatarBadge from '../components/AvatarBadge'
import BottomWave from '../components/BottomWave'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('This field is required'),
  password: yup.string().required('Password is required'),
})

const SignupScreen = ({ navigation }) => {
  const [agreed, setAgreed] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit = (data) => {
    // TODO(backend): call auth/signup with { name, email, password, agreed }
    // then navigate to "Tabs" (or a verification screen) on success
    console.log('Signup form values', { ...data, agreed })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign up</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome to us,</Text>
        <Text style={styles.subtitle}>Hello there, create New account</Text>

        <AvatarBadge iconName="person" />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor={colors.textGray} value={value} onChangeText={onChange} />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Text Input" placeholderTextColor={colors.textGray} value={value} onChangeText={onChange} autoCapitalize="none" />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor={colors.textGray} value={value} onChangeText={onChange} secureTextEntry />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        <TouchableOpacity style={styles.termsRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Ionicons name="checkmark" size={14} color={colors.white} />}
          </View>
          <Text style={styles.termsText}>
            By creating an account you agree to our <Text style={styles.termsLink}>Term and Conditions</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign in</Text>
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
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 16 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1, borderColor: colors.inputBorder, marginRight: 8, marginTop: 2, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: colors.primaryLight, borderColor: colors.primaryLight },
  termsText: { flex: 1, fontSize: 12, color: colors.textGray },
  termsLink: { color: colors.primaryLight, fontWeight: '600' },
  signUpButton: { backgroundColor: colors.primaryLight, borderRadius: 10, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  signUpButtonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  footerText: { color: colors.textGray, fontSize: 13 },
  footerLink: { color: colors.primaryLight, fontSize: 13, fontWeight: '600' },
})

export default SignupScreen