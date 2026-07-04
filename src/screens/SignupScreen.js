// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   ActivityIndicator
// } from 'react-native';

// import { useState } from 'react';
// import { signUp } from '../firebase/firebaseAuth';

// const SignupScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Form validation
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [nameError, setNameError] = useState('');
  
//   const validateEmail = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) {
//       setEmailError('Email is required');
//       return false;
//     } else if (!emailRegex.test(email)) {
//       setEmailError('Please enter a valid email');
//       return false;
//     }
//     setEmailError('');
//     return true;
//   };
  
//   const validatePassword = () => {
//     if (!password) {
//       setPasswordError('Password is required');
//       return false;
//     } else if (password.length < 6) {
//       setPasswordError('Password must be at least 6 characters');
//       return false;
//     }
//     setPasswordError('');
//     return true;
//   };
  
//   const validateName = () => {
//     if (!fullName) {
//       setNameError('Full name is required');
//       return false;
//     }
//     setNameError('');
//     return true;
//   };
  
//   const validateForm = () => {
//     const isEmailValid = validateEmail();
//     const isPasswordValid = validatePassword();
//     const isNameValid = validateName();
//     return isEmailValid && isPasswordValid && isNameValid;
//   };

//   const handleSignup = async () => {
//     setError('');
    
//     if (!validateForm()) {
//       return;
//     }
    
//     try {
//       setIsLoading(true);
//       await signUp(email, password, fullName);
//       setIsLoading(false);
//       navigation.navigate('Home');
//     } catch (err) {
//       setIsLoading(false);
//       setError(err.message);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <View style={styles.header}>
//             <Text style={styles.title}>Create Account</Text>
//             <Text style={styles.subtitle}>Sign up to get started</Text>
//           </View>
          
//           <View style={styles.form}>
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Full Name</Text>
//               <TextInput
//                 style={[styles.input, nameError ? styles.inputError : null]}
//                 placeholder="John Doe"
//                 value={fullName}
//                 onChangeText={setFullName}
//                 onBlur={validateName}
//                 autoCapitalize="words"
//               />
//               {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
//             </View>
            
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={[styles.input, emailError ? styles.inputError : null]}
//                 placeholder="email@example.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 onBlur={validateEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//               {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
//             </View>
            
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Password</Text>
//               <TextInput
//                 style={[styles.input, passwordError ? styles.inputError : null]}
//                 placeholder="••••••••"
//                 value={password}
//                 onChangeText={setPassword}
//                 onBlur={validatePassword}
//                 secureTextEntry
//                 autoCapitalize="none"
//               />
//               {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
//             </View>
            
//             {error ? <Text style={styles.globalError}>{error}</Text> : null}
            
//             <TouchableOpacity 
//               style={styles.button} 
//               onPress={handleSignup}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Sign Up</Text>
//               )}
//             </TouchableOpacity>
            
//             <View style={styles.loginContainer}>
//               <Text style={styles.loginText}>Already have an account?</Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                 <Text style={styles.loginLink}>Log in</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   keyboardAvoid: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: 24,
//   },
//   header: {
//     marginTop: 40,
//     marginBottom: 32,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//   },
//   form: {
//     width: '100%',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 8,
//   },
//   input: {
//     height: 52,
//     borderWidth: 1,
//     borderColor: '#E1E1E1',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     backgroundColor: '#F9F9F9',
//   },
//   inputError: {
//     borderColor: '#FF3B30',
//   },
//   errorText: {
//     color: '#FF3B30',
//     fontSize: 12,
//     marginTop: 4,
//   },
//   globalError: {
//     color: '#FF3B30',
//     fontSize: 14,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   button: {
//     height: 52,
//     backgroundColor: '#4F46E5',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 8,
//     marginBottom: 24,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loginText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   loginLink: {
//     color: '#4F46E5',
//     fontSize: 14,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
// });

// export default SignupScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const SignupScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName) {
      Alert.alert(t('alertErrorTitle'), t('errorNameRequired'));
      return;
    }
    if (!email) {
      Alert.alert(t('alertErrorTitle'), t('errorEmailRequired'));
      return;
    }
    if (!password) {
      Alert.alert(t('alertErrorTitle'), t('errorPasswordRequired'));
      return;
    }

    try {
      setLoading(true);
      // signup logic here...
      Alert.alert(t('alertSuccessTitle'), t('signupSubtitle'));
      navigation.replace('Login');
    } catch (err) {
      Alert.alert(t('alertErrorTitle'), t('errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signupTitle')}</Text>
      <Text style={styles.subtitle}>{t('signupSubtitle')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('placeholderFullName')}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder={t('placeholderEmail')}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder={t('placeholderPassword')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>
          {loading ? t('buttonSigningUp') : t('buttonSignUp')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>
          {t('alreadyHaveAccount')} {t('loginLink')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { marginTop: 20, textAlign: 'center', color: '#007BFF' },
});

export default SignupScreen;
