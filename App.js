import { StyleSheet, View } from 'react-native';
import AppNavigator from './components/AppNavigator';

export default function App() {
  return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
