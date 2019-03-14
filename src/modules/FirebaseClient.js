import firebase from 'firebase/app';
import 'firebase/auth';

class FirebaseClient {
  instance: Object;

  init = () => {
    firebase.initializeApp({
      apiKey: 'AIzaSyCqycsEIBWDwrzkeravJrszAMdKcrrEF0k',
      authDomain: 'platform-demo-9e004.firebaseapp.com',
      databaseURL: 'https://platform-demo-9e004.firebaseio.com',
      projectId: 'platform-demo-9e004',
      storageBucket: 'platform-demo-9e004.appspot.com',
      messagingSenderId: '101403925650',
    });

    this.instance = firebase;
  };
}

export default new FirebaseClient();
