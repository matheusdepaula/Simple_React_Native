import { Platform } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Login, Register, ToDoTasks, DoneTask , App, Task, Profile } from '../screens/screens';

const taskListTabNavigator = createBottomTabNavigator({
  pageToDoTasks: {screen: ToDoTasks, navigationOptions: {title: 'To Do'}},
  pageDoneTasks: {screen: DoneTask, navigationOptions: {title: 'Done'}},
  profile: { screen: Profile, navigationOptions: {title: 'Profile'}},
});

const routes = createStackNavigator(
  {
    pageApp: { screen: App },
    pageLogin: { screen: Login }, 
    pageRegister: { screen: Register },
    pageTaskList: { 
      screen: taskListTabNavigator,
      navigationOptions: {
        ...Platform.select({
          ios: {
            title: 'To Do'
          },
          android: {
            header: null
          }
        })
      }
    },
    pageTask: { screen: Task }
  }, 
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(64, 129, 61, 0.45)',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
  {
    headerMode: 'screen' 
  }
);

const AppContainer = createAppContainer(routes);
export default AppContainer;