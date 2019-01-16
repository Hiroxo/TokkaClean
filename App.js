import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import UserDetailScreen from './components/UserDetailScreen';
import RegistrationScreen from './components/RegistrationScreen';
import UserProfileScreen from './components/UserProfileScreen';
import UserRequestScreen from './components/UserRequestScreen';
import SignInScreen from './components/SignInScreen';
import AuthLoadingScreen from './components/AuthLoadingScreen';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    UserDetail: UserDetailScreen,
    Registration: RegistrationScreen,
    UserProfile: UserProfileScreen,
    UserRequest: UserRequestScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
const AuthStack = createStackNavigator(
  {
    Login: SignInScreen,
    Registration: RegistrationScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends React.Component {
  handleNavigationChange() {
    console.log("changed screen")
  }
  render() {
    return <AppContainer
      onNavigationStateChange={this.handleNavigationChange}
      uriPrefix="/app" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
