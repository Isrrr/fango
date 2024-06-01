/**
 * @format
 */

import {AppRegistry} from 'react-native';

<<<<<<< Updated upstream:index.js
import App from './App';
import {name as appName} from './app.json';
=======
import App from './app/App';

import {name as appName} from '../app.json';
>>>>>>> Stashed changes:src/index.ts

AppRegistry.registerComponent(appName, () => App);
