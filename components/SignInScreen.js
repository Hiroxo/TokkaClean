import React from 'react';
import { Text,
    AsyncStorage,
    Button,
    StyleSheet,
    View,
    Alert,
} from 'react-native';
import firebase from "../Firebase";
import firebaseForFacebook from "firebase";


class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };
    render() {
      
      return (
        <View style={styles.container}>
        <Text>
            We'd like you to login with a social media account to verify your identity. We do not post to your social media.
        </Text>
            <Button title="Facebook Login" onPress={this.login} />
            {/* <Button title="Facebook Login with firebase" onPress={handleFbLogin} /> */}
            

            <Button
                title="Go to Registration"
                onPress={() => this.props.navigation.navigate('Registration')}/>
        </View>
      );
    }
    login = async () => {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1932831233504553', {
          permissions: ['public_profile'],
        });
        

        if (type === 'success') {
          //login to firebase
          let credential = firebaseForFacebook.auth.FacebookAuthProvider.credential(token);
          try {
            const response = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
            console.log("response from firebase auth", response);
          }
          catch (error) {
            console.error('User signin error with Facebook credential', error);
          }

          const response = await fetch(
           `https://graph.facebook.com/me?access_token=${token}`);
            await AsyncStorage.setItem('userToken', token);
            this.props.navigation.navigate('App');
            Alert.alert(
                'Logged in!',
                `Hi ${(await response.json()).name}!`,
            );
        }
    }
  }
  
export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });