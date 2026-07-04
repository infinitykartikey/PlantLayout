import React from 'react'
import AppNavigator from './src/routes/AppNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TestProvider } from './src/context/TestContext'

function App() {
  return (
    <SafeAreaProvider>
      <TestProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </TestProvider>
    </SafeAreaProvider>
  )
}

export default App