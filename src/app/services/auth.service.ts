import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {}

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  anonymousLogin(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInAnonymously();
  }

  linkAccount(email: string, password: string): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this.afAuth.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(
        userCredential => {
          this.afDatabase.object(`/userProfile/${userCredential.user.uid}`).update({
            email: email,
          });
        },
        error => {
          console.log('There was an error linking the account', error);
        }
      );
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
