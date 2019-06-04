import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Button, Alert } from 'react-native'
import { signOutOnFirebaseAsync } from '../services/firebaseApi'
import { StackActions, NavigationActions } from 'react-navigation';

const imgProfile = require('../../assets/face_tab.png'); 

export default class Profile extends Component {
  static navigationOptions = { 
    tabBarIcon: ({ tintColor }) => (
      <Image source={imgProfile}
        style={[styles.icon, { tintColor: tintColor }]} />)
  }

  _logoutAction = () => {
    signOutOnFirebaseAsync();
    try {
      const resetNavigation = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'pageLogin'
        })]
      });
      this.props.navigation.dispatch(resetNavigation);  
    } catch (error) {
      Alert.alert("Logout Failed", error.message); 
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}> 
          <Text style={styles.title}>Desenvolvimento Multiplataforma - IESB</Text>
        </View>
        <View style={styles.footer}> 
          <Text style={{alignSelf: 'center', fontSize: 16}}>Matheus Pereira de Paula e Sousa</Text>
          <Text style={{marginVertical: 12}}>Matrícula -> 1831088009</Text>
          <Button style={{marginHorizonal: 24, marginVertical: 20}} title='Sair' onPress={() => this._logoutAction()}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  icon: {
    width: 26,
    height: 26 
  },
  container: {
    flex: 1
  },
  title: {
    alignSelf: 'center', 
    textAlign: 'center',
    marginTop: 24, 
    fontWeight: '600', 
    fontSize: 20,
    marginHorizontal: 16
  },
  footer: {
    height: 125, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});