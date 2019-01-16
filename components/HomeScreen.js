import React, { Component } from 'react';
import { Alert, AsyncStorage, Button, StyleSheet, ScrollView, ActivityIndicator, View, Text, Flatlist } from 'react-native';
import firebase from '../Firebase';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('user');
        this.unsubscribe = null;
        this.state = {
            key:'',
            isLoading: true,
            users: []
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            headerRight: (
            <Button
                title="Edit Profile"
                onPress={() => navigation.navigate('UserProfile', {
                    boardkey: `${JSON.stringify(this.state.key)}`,
                  })}
                />
            ),
        };
    };
    
    onCollectionUpdate = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            const { address, availability, name, city, zip, rating, geopoint } = doc.data();
            users.push({
                key: doc.id,
                doc, // DocumentSnapshot
                address, 
                availability, 
                name,
                city,
                zip,
                rating,
                geopoint,

            });
        });
        this.setState({
            users,
            isLoading: false,
        });
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

        
    }
    logout = async () => {

        await AsyncStorage.clear(); 
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('AuthLoading');
    }
    render() {
        if(this.state.isLoading){
            return(
              <View style={styles.activity}>
                <ActivityIndicator size="large" color="#0000ff"/>
              </View>
            )
        } else {
            return (
                <ScrollView style={styles.container}>
                    <Button
                        title="Logout"
                        onPress={this.logout}/>
                    <Button
                        title="Go to Registration"
                        onPress={() => this.props.navigation.navigate('Registration')}/>
                    {
                        this.state.users.map((user, i) => (
                            <View key={i} style={styles.item}>
                                <Text style={styles.text}>
                                    {user.name} at lat:{user.address._lat} lon:{user.address._long} is 
                                    {user.availability ? ' available': ' unavailable'}  
                                </Text>
                                <Text style={styles.text}>
                                    rating: {user.rating}
                                </Text>
                                <Button
                                    title={`${user.key}`}
                                    onPress={() => {
                                        this.props.navigation.navigate('UserDetail', {
                                            userkey: `${JSON.stringify(user.key)}`,
                                        });
                                    }}
                                />
                                    
                            </View>
                        ))
                    }
                </ScrollView>
            );
        }
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    item: {
        padding: 10,
        
    },
    text: {
        fontSize: 18,
        textAlign:'center',
        flex:1,
        flexWrap:'wrap',
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