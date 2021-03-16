import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()

export class AuthService {

    isAuth = false;

    createNewUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(
                    () => {
                        resolve;
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signInUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password).then(
                    () => {
                        resolve;
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signOutUser() {
        firebase.auth().signOut();
    }

    signIn() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    this.isAuth = true;
                    resolve(true);
                }, 2000);
            }
        )
    };

    signOut() {
        this.isAuth = false;
    }
}