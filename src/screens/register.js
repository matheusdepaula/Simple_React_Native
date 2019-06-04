import React, {Component} from 'react';
import {TextInput, StyleSheet, View, KeyboardAvoidingView, Button, Image, Text, Alert, SafeAreaView} from 'react-native';
import { createUserOnFirebaseAsyn } from '../services/firebaseApi';

const img = require('../../assets/to-do.png');

export default class Register extends Component {

  static navigationOptions = { 
    title: 'Register'
  };

  render() {
    return (
      <SafeAreaView style={styles.container}> 
        <KeyboardAvoidingView 
          behavior='padding'>
          <View style={styles.topView}>
            <Image style={styles.img} source={img} />
            <Text style={styles.title}>Registering new user</Text> 
          </View>
            <View style={styles.bottomView}> 
              <TextInput style={styles.input}
                placeholder='Email'
                keyboardType={'email-address'} autoCapitalize='none'
                onChangeText={email => this.setState({ email })} />
              <TextInput style={styles.input}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })} />
            <Button title='Register User'
              onPress={() => this._createUserAsync()} /> 
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView> 
    );
  }

  async _createUserAsync() {
    try {
      const user = await createUserOnFirebaseAsyn(this.state.email, this.state.password);
      Alert.alert('User Created!', `User ${user.email} has succesfuly been created!`, [{
        text: 'Ok', onPress: () => {
          this.props.navigation.goBack();
        }
      }]);
    } catch (error) {
      Alert.alert('Create User Failed!', error.message); 
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40
  },
  img: {
    width: 80,
    height: 80
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20
  },
  bottomView: {
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 40
  }
});