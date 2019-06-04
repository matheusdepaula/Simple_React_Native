import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TaskListView } from '../components/components'
import { readTasksFromFirebaseAsync } from '../services/firebaseApi';

const imgDone = require('../../assets/done_tab.png'); 

export default class DoneTasks extends Component {
  static navigationOptions = { 
    tabBarIcon: ({ tintColor }) => (
      <Image source={imgDone}
        style={[styles.icon, { tintColor: tintColor }]} />)
  }

  state = {
    tasks: []
  }

  componentDidMount() {
    readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
  }

  _fetchTasks(tasks) {
    const tasksToDo = tasks.filter(task => task.isDone);
    this.setState({ tasks: tasksToDo });
  }

  render() {
    return (
      <View style={styles.container} >
        <TaskListView tasks={this.state.tasks} navigation={this.props.navigation}/>
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
  }
});