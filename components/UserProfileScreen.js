import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput,Button, Text } from 'react-native';
import firebase from '../Firebase';

class UserProfileScreen extends Component {
  static navigationOptions = {
    title: 'Edit Profile',
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('user');
    this.state = {
      key:'',
      name:'',
      _lat:'',
      _long:'',
      rating:0,
      geopoint:{},
      address:'',
      city:'',
      zip:'',
      availability:false,
      isLoading: false,
      bio:"",
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('user').doc(JSON.parse(navigation.getParam('userkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        const user = doc.data();
        this.setState({
          key: doc.id,
          name: user.name,
          bio: user.bio,
          city: user.city,
          address: user.address,
          rating:user.rating,
          zip:user.zip,
          availability: user.availability,
          _lat: user.geopoint._lat,
          _long: user.geopoint._long,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  updateBoard() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    const updateRef = firebase.firestore().collection('user').doc(this.state.key);
    updateRef.set({
      name: this.state.name,
      geopoint: {_lat:this.state._lat, _long:this.state._long},
      availability: this.state.availability,
      bio:this.state.bio,
      address:this.state.address,
      city:this.state.city,
      zip:this.state.zip,
      availability:this.state.availability
    }).then((docRef) => {
      this.setState({
        name: '',
        _lat:'',
        _long:'',
        availability: false,
        bio:'',
        isLoading: false,
        geopoint:{},
        address:'',
        zip:'',
        city:'',
      });
      this.props.navigation.navigate('UserProfile');
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
              placeholder={'Street Name and Number'}
              value={this.state.address.toString(10)}
              onChangeText={(text) => this.updateTextInput(text, 'address')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'City'}
              value={this.state.city.toString(10)}
              onChangeText={(text) => this.updateTextInput(text, 'city')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Zip Code'}
              value={this.state.zip.toString(10)}
              onChangeText={(text) => this.updateTextInput(text, 'zip')}
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


export default UserProfileScreen;
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