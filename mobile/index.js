import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

try {
  console.log('Attempting to register main component:', appName);
  AppRegistry.registerComponent(appName, () => App);
  console.log('Main component registered successfully');
} catch (error) {
  console.error('Error registering main component:', error);
  alert('Error registering main component:', error);
}
