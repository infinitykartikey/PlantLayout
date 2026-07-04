import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTestResult = async (employeeData, testScores) => {
  try {
    const testResult = {
      ...employeeData,
      scores: testScores,
      timestamp: new Date().toISOString()
    };

    // Save to AsyncStorage
    const existingResults = await AsyncStorage.getItem('testResults');
    const results = existingResults ? JSON.parse(existingResults) : [];
    
    results.push(testResult);
    
    await AsyncStorage.setItem('testResults', JSON.stringify(results));
    return true;
  } catch (error) {
    console.error('Error saving test result', error);
    return false;
  }
};

export const retrieveTestResults = async () => {
  try {
    const results = await AsyncStorage.getItem('testResults');
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error('Error retrieving test results', error);
    return [];
  }
};