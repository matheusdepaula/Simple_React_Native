import React, {Component} from 'react';
import {TextInput, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Text, Image, Button, Alert, SafeAreaView, ActivityIndicator} from 'react-native';
import { signInOnFirebaseAsync } from '../services/firebaseApi';
import { StackActions, NavigationActions } from 'react-navigation';

const icon = require('../../assets/to-do.png');
const info = require('../../assets/info_btn.png');

export default class Login extends Component {
  static navigationOptions = { 
    header: null
  };

  state = {
    email: this.props.email,
    password: '',
    loading: false
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

  showAlertInfo = () => {
    Alert.alert("Easy Access", 'Email: matheus@gmail.com   Pass: 12345678'); 
  }

  renderLoading = () => {
    return (
      <View style={styles.load}> 
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  renderContent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>

        <View style={styles.logoContainer}>
          <Image source={icon} style={{width: 220, height: 190}}/>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TextInput 
            style={[styles.textContainer, {flex: 1}]}
            placeholder={'E-mail'}
            value={this.state.email}
            keyboardType={'email-address'}
            onChangeText={email => this.setState({email})} />

          <TouchableOpacity style={{marginHorizontal: 12, alignSelf: 'center'}} onPress={ () => this.showAlertInfo()}> 
            <Image source={info} style={{width: 22, height: 22}}/>
          </TouchableOpacity>

        </View>

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
        {this.state.loading && this.renderLoading()}
      </SafeAreaView>
    );
  }

  render() {
    return this.renderContent();
  }

  async _signInAsync() {
    this.setState({ loading: true });
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
      this.setState({ loading: false });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FEFEFE',
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
  },
  load: {
    flex: 1, 
    position: 'absolute', 
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});
