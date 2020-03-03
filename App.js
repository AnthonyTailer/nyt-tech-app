import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import NewsList from './src/components/NewsList'
import IconWithBadge from './src/components/IconWithBadge'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Technology"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName

                  if (route.name === 'Technology') {
                    iconName = 'globe'
                  } else if (route.name === 'Science') {
                    iconName = 'chemistry'
                  }

                  // You can return any component that you like here!
                  return <IconWithBadge name={iconName} size={size} color={color} />;
                },
            })}
          >
            <Tab.Screen name="Technology" component={NewsList} initialParams={{ section: 'technology' }} />
            <Tab.Screen name="Science" component={NewsList} initialParams={{ section: 'science' }}/>
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
