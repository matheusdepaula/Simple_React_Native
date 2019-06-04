import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { TaskListView } from '../components/components'
import { readTasksFromFirebaseAsync } from '../services/firebaseApi'

const imgCheckList = require('../../assets/todo_tab.png'); 
const imgNewTask = require('../../assets/add_icon.png');

export default class ToDoTasks extends Component {
  static navigationOptions = { 
    tabBarIcon: ({ tintColor }) => (
      <Image source={imgCheckList} style={[styles.icon, { tintColor }]} /> )
  }

  state = {
    tasks: []
  }

  componentDidMount() {
    readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
  }

  _fetchTasks(tasks) {
    const tasksToDo = tasks.filter(task => !task.isDone);
    this.setState({ tasks: tasksToDo });
  }

  _goToTask() {
    this.props.navigation.navigate('pageTask');
  }

  render() {
    return (
      <View style={styles.container} >
        <TaskListView tasks={this.state.tasks} navigation={this.props.navigation}/>
        <TouchableOpacity style={styles.floatButton} 
          onPress={() => this._goToTask()}>
          <Image source={imgNewTask} style={styles.img}/>
        </TouchableOpacity>
      </View> 
    );
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    flexDirection: 'column', 
    paddingLeft: 10, 
    paddingRight: 10
  }, 
  icon: {
    width: 26,
    height: 26 
  },
  img: {
    width: 50,
    height: 50 
  },
  floatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20
  }
});