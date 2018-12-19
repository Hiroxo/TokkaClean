import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button } from 'react-native';
import firebase from '../Firebase';

class UserDetailScreen extends Component {
  static navigationOptions = {
    title: 'User Details',
  };
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
      key: ''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('user').doc(JSON.parse(navigation.getParam('userkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  deleteUser(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firebase.firestore().collection('user').doc(key).delete().then(() => {
      console.log("Document successfully deleted!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('Home');
    }).catch((error) => {
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
    });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text h3>{this.state.user.name}</Text>
            </View>
            <View>
              <Text h5>Rating: {this.state.user.rating}</Text>
            </View>
            <View>
              <Text h4>Latitude:{this.state.user.address._lat} Longitude:{this.state.user.address._long}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              title='Request'
              onPress={() => {
                this.props.navigation.navigate('UserRequest', {
                  userkey: `${JSON.stringify(this.state.key)}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              color={'red'}
              title='delete'
              onPress={() => this.deleteUser(this.state.key)} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
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
  },
  detailButton: {
    marginTop: 10
  }
})

export default UserDetailScreen;