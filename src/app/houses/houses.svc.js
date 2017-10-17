import * as firebase from 'firebase';

class FirebaseService {
  constructor(){
    'ngInject';
    firebase.initializeApp({
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DATABASE_URL,
    });
    firebase.auth().signInWithEmailAndPassword(FIREBASE_USER_EMAIL, FIREBASE_USER_PASSWORD).catch(function(error) {
      if(error) {
          console.error('Error Occurred:', error.code, ':', error.message);
      }
    });
    this.db = firebase.database();
    this.firebaseRef = this.db.ref('houses/');
  }

  createHouse(name) {

  }

  deleteHouse(houseID) {

  }

  updateHouse(houseID) {

  }

  listHouses() {

  }
}
