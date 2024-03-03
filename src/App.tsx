import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { AppNavigation } from './navigation/AppNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
