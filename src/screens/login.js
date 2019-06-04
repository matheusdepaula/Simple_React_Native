import React, {Component} from 'react';
import {TextInput, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Text, Image, Button, Alert, SafeAreaView} from 'react-native';
import { signInOnFirebaseAsync } from '../services/firebaseApi';
import { StackActions, NavigationActions } from 'react-navigation';

const icon = require('../../assets/to-do.png');

export default class Login extends Component {
  static navigationOptions = { 
    header: null
  };

  state = {
    email: this.props.email,
    password: ''
  }

  onRegisterPress = () => {
    const { navigate } = this.props.navigation;
    navigate('pageRegister');
  }

  renderCustomButton = () => {
    return (
      <TouchableOpacity style={styles.button}>
        <View>
          <Text style={{color: 'white'}} >
            SIGN IN
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderButton = () => {
    return (
      <Button style={styles.button} onPress={() => this._signInAsync()} title='Sign In'/>
    );
  }

  renderRegisterButton = () => {
    return (
      <View style={{flexDirection: 'row', marginVertical: 20, alignSelf: 'center'}}>
        <Text style={{fontSize: 16}}>
          Not a Member? Let's
        </Text>
        <TouchableOpacity onPress={ () => this.onRegisterPress()}> 
          <Text style={{fontSize: 16, fontWeight: 'bold', marginHorizontal: 4}}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>

        <View style={styles.logoContainer}>
          <Image source={icon} style={{width: 220, height: 190}}/>
        </View>

        <TextInput 
          style={styles.textContainer}
          placeholder={'E-mail'}
          value={this.state.email}
          keyboardType={'email-address'}
          onChangeText={email => this.setState({email})} />
        <View style={styles.separator}/>

        <TextInput 
          style={styles.textContainer}
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={password => this.setState({password})} />
        <View style={styles.separator}/>

        {this.renderButton()}
        {this.renderRegisterButton()}

        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  async _signInAsync() {
    try {
      const user = await signInOnFirebaseAsync(this.state.email,this.state.password);
      const resetNavigation = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'pageTaskList'
        })]
      });
      this.props.navigation.dispatch(resetNavigation);  
    } catch (error) {
      Alert.alert("Login Failed", error.message); 
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '45%',
    width: '100%',
    marginBottom: 4,
  },
  textContainer: {
    height: 30,
    marginTop: 24,
    marginHorizontal: 16
  },
  separator: {
    borderColor: '#364a6b', 
    borderWidth: 0.3, 
    marginHorizontal: 16,
    marginTop: 3
  },
  button: {
    marginTop: 28, 
    marginHorizontal: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 45, 
    backgroundColor: '#364a6b'
  }
});
