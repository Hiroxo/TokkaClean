import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput,Button, Text } from 'react-native';
import firebase from '../Firebase';

class RegistrationScreen extends Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('user');
    this.state = {
      name:'',
      _lat:'',
      _long:'',
      rating:0,
      availability:false,
      isLoading: false,
      bio:"",
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  saveUser() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      name: this.state.name,
      address: {_lat:this.state._lat, _long:this.state._long},
      availability: this.state.availability,
      bio:this.state.bio,
    }).then((docRef) => {
      this.setState({
        name: '',
        _lat:'',
        _long:'',
        availability: false,
        bio:'',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(text) => this.updateTextInput(text, 'name')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Bio'}
              value={this.state.bio}
              onChangeText={(text) => this.updateTextInput(text, 'bio')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Latitude'}
              value={this.state._lat.toString(10)}
              onChangeText={(text) => this.updateTextInput(parseInt(text), '_lat')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Longitude'}
              value={this.state._long.toString(10)}
              onChangeText={(text) => this.updateTextInput(parseInt(text), '_long')}
          />
        </View>
        
        <View style={styles.button}>
          <Button
            title='Save'
            onPress={() => this.saveUser()} />
        </View>
      </ScrollView>
    );
  }
}


export default RegistrationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})