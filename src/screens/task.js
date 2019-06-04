import React, { Component } from 'react';
import { View, TextInput, Switch, Text, Button, StyleSheet, Alert } from 'react-native';
import { writeTaskOnFirebase } from '../services/firebaseApi';

export default class Task extends Component {
  static navigationOptions = {
    title: 'Task'
  }

  constructor(props) {
    super(props);

    try {
      const task = this.props.navigation.state.params.task;
      this.state = {
        key: task.key,
        title: task.title,
        resume: task.resume,
        priority: task.priority,
        isDone: task.isDone
      }
    } catch (error) {
      this.state = {
        key: null,
        title: '',
        resume: '',
        priority: '',
        isDone: false
      }
    }
  }

  async _saveTaskAsync() {
    let task = {
      key: this.state.key,
      title: this.state.title,
      resume: this.state.resume,
      priority: this.state.priority,
      isDone: this.state.isDone
    };

    try {
      await writeTaskOnFirebase(task);
      this.props.navigation.goBack();
    } catch(error) {
      Alert.alert('Error Saving', error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} 
          placeholder='Title'
          value={this.state.title !== null ? this.state.title: ''}
          onChangeText={value => this.setState({ title: value })}/>

          <TextInput style={[styles.input, styles.multilineInput]}
            placeholder='Resume'
            multiline={true} numberOfLines={4} value={this.state.resume}
            onChangeText={(value) => this.setState({ resume: value })} /> 
            
          <View style={styles.switchContainer}>
            <Switch value={this.state.priority}
              onValueChange={(value) => this.setState({ priority: value })} 
              value={this.state.priority} />

            <Text style={styles.switchText}>Hight Priority</Text>
          </View>

          <View style={styles.switchContainer}> 
            <Switch value={this.state.isDone}
              onValueChange={(value) => this.setState({ isDone: value })}
              value={this.state.isDone} />
            <Text style={styles.switchText}>Is Done?</Text>
          </View>

          <Button style={styles.button}
            title='Save'
            onPress={() => this._saveTaskAsync()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    flexDirection: 'column', padding: 20,
  }, 
  input: {
    marginBottom: 20 
  },
  multilineInput: { 
    height: 100
  }, 
  switchContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingBottom: 20
  }, 
  switchText: {
    marginLeft: 10, color: 'black', fontSize: 18
  } 
});