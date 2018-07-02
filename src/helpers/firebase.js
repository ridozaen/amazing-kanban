import firebase from 'firebase/app'
import 'firebase/database'
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBkI429bbYa9UaKiR7E6mNVopwyBjpb-jE',
  authDomain: 'amazing-kanban-46a76.firebaseapp.com',
  databaseURL: 'https://amazing-kanban-46a76.firebaseio.com',
  projectId: 'amazing-kanban-46a76',
  storageBucket: '',
  messagingSenderId: '890042131681'
}
firebase.initializeApp(config)

let db = firebase.database()
const todos = db.ref('/todos')
const progress = db.ref('/progress')
const completed = db.ref('/completed')

export {todos, progress, completed}
