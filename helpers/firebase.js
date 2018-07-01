import firebase from 'firebase/app'
import 'firebase/database'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBkI429bbYa9UaKiR7E6mNVopwyBjpb-jE",
    authDomain: "amazing-kanban-46a76.firebaseapp.com",
    databaseURL: "https://amazing-kanban-46a76.firebaseio.com",
    projectId: "amazing-kanban-46a76",
    storageBucket: "",
    messagingSenderId: "890042131681"
  };
  firebase.initializeApp(config);

  let db=firebase.database()
  const todos = db.ref('/todos')
  const inProgress = db.ref('/inProgress')
  const done = db.ref('done')

  export {todos, inProgress, done}