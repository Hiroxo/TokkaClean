import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput,Button, Text } from 'react-native';

import firebase from '../Firebase';

class UserProfileScreen extends Component {
  static navigationOptions = {
    title: 'Edit Profile',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home</Text>
          <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
          title="Go to User Profile"
          onPress={() => this.props.navigation.navigate('UserProfile')}
          />
          <Button
          title="Go to User Details"
          onPress={() => this.props.navigation.navigate('UserDetails')}
          />
          <Button
          title="Go to Registration"
          onPress={() => this.props.navigation.navigate('Registration')}
          />
          <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
          />
      </View>
    );
  }
}

export default UserProfileScreen;