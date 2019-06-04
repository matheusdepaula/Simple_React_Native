import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAwsVG_1WAGdXQqwFjrtq4NpOfQHlmtopA",
  authDomain: "todomanager-39905.firebaseapp.com",
  databaseURL: "https://todomanager-39905.firebaseio.com",
  projectId: "todomanager-39905",
  storageBucket: "todomanager-39905.appspot.com",
  messagingSenderId: "735030795102"
};

export const initializeFirebaseApi = () => firebase.initializeApp(config);

export const createUserOnFirebaseAsyn = async (email, password) => {
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

  return user;
} 

export const signInOnFirebaseAsync = async (email, password) => {
  const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
  return user; 
}

export const signOutOnFirebaseAsync = async () => {
  firebase.auth().signOut();
}

export const currentFirebaseUser = () => {
  return new Promise((resolve, reject) => {
    let unsubscribe = null;
    unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    }, (error) => {
      reject(error);
    }, () => {
      unsubscribe();
    })
  });
}

export const writeTaskOnFirebase = async task => {
  const user = await currentFirebaseUser();

  let taskReference = firebase.database().ref(user.uid);
  // const key = taskReference.child('tasks').push().key;
  const key = task.key ? 
    task.key : 
    taskReference.child('tasks').push().key;

  return await taskReference.child(`tasks/${key}`).update(task);
}

export const readTasksFromFirebaseAsync = async listener => {
  const user = await currentFirebaseUser();
  
  let tasksReference = firebase.database().
    ref(user.uid).
    child('tasks');

  tasksReference.
    on('value', snapshot => {
      let tasks = [];
      snapshot.forEach(element => {
        let task = element.val();
        task.key = element.key;
        tasks.push(task);
      });
      listener(tasks);
    })
}