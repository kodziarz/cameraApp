import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import MainScreen from './components/MainScreen';
import PhotosList from './components/PhotosList';

const Stack = createNativeStackNavigator();


const SCREENS = {
  MAIN: "main",
  PHOTOS_LIST: "photosList"
}
export { SCREENS }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SCREENS.MAIN} component={MainScreen} />
        <Stack.Screen name={SCREENS.PHOTOS_LIST} component={PhotosList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

