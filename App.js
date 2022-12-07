import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import MainScreen from './screens/MainScreen';
import PhotoDetails from './screens/PhotoDetails';
import PhotosList from './screens/PhotosList';
import { SCREENS } from './Consts';
import CameraScreen from './screens/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SCREENS.MAIN} component={MainScreen} />
        <Stack.Screen name={SCREENS.PHOTOS_LIST} component={PhotosList} />
        <Stack.Screen name={SCREENS.PHOTO_DETAILS} component={PhotoDetails} />
        <Stack.Screen name={SCREENS.CAMERA} component={CameraScreen} />
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

