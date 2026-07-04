// import React from 'react';
// import {View, TextInput, StyleSheet, Text} from 'react-native';
// import Button from '../common/Button';
// import ImageInput from './ImageInput';
// import { useTest } from '../../context/TestContext';

// const EmployeeForm = ({onSubmit}) => {
//   const {employeeData, updateEmployeeData} = useTest();

//   const handleSubmit = () => {
//     if (
//       !employeeData.name ||
//       !employeeData.employeeCode ||
//       !employeeData.photo
//     ) {
//       alert('Please fill all the fields and capture a photo');
//       return;
//     }
//     onSubmit();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Name</Text>
//       <TextInput
//         style={styles.input}
//         value={employeeData.name}
//         onChangeText={text => updateEmployeeData({name: text})}
//         placeholder="Enter your name"
//       />

//       <Text style={styles.label}>Employee Code</Text>
//       <TextInput
//         style={styles.input}
//         value={employeeData.employeeCode}
//         onChangeText={text => updateEmployeeData({employeeCode: text})}
//         placeholder="Enter your employee code"
//       />

//       <ImageInput
//         value={employeeData.photo}
//         onChangeText={photoUri => updateEmployeeData({photo: photoUri})}
//       />
//       <Button
//         title="Continue"
//         onPress={handleSubmit}
//         style={styles.submitButton}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20, 
//     width: '100%', 
//     maxWidth: 500
//   },
//   label: {
//     fontSize: 16, 
//     fontWeight: 'bold', 
//     marginBottom: 5
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 16,
//     marginBottom:16
//   },
//   submitButton: {
//     marginTop: 30
//   },
// });

// export default EmployeeForm;

import React from 'react';
import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';
import Button from '../common/Button';
import ImageInput from './ImageInput';
import { useTest } from '../../context/TestContext';
import { useTranslation } from 'react-i18next';

const EmployeeForm = ({onSubmit}) => {
  const {employeeData, updateEmployeeData} = useTest();
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (
      !employeeData.name ||
      !employeeData.employeeCode ||
      !employeeData.photo
    ) {
      Alert.alert(t('alertErrorTitle'), t('employeeFormError'));
      return;
    }

    // Validate name: only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(employeeData.name)) {
      Alert.alert(t('alertErrorTitle'), t('employeeNameInvalid'));
      return;
    }

    // Validate employee code: only digits
    const codeRegex = /^[0-9]+$/;
    if (!codeRegex.test(employeeData.employeeCode)) {
      Alert.alert(t('alertErrorTitle'), t('employeeCodeInvalid'));
      return;
    }

    onSubmit();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('employeeNameLabel')}</Text>
      <TextInput
        style={styles.input}
        value={employeeData.name}
        onChangeText={text => updateEmployeeData({name: text})}
        placeholder={t('employeeNamePlaceholder')}
      />

      <Text style={styles.label}>{t('employeeCodeLabel')}</Text>
      <TextInput
        style={styles.input}
        value={employeeData.employeeCode}
        onChangeText={text => updateEmployeeData({employeeCode: text})}
        placeholder={t('employeeCodePlaceholder')}
        keyboardType="numeric"
      />

      <ImageInput
        value={employeeData.photo}
        onChangeText={photoUri => updateEmployeeData({photo: photoUri})}
      />

      <Button
        title={t('continueButton')}
        onPress={handleSubmit}
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 500,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor:"#4f46e5",
    marginTop: 30,
  },
});

export default EmployeeForm;
