import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  secondes: number;
  // On stock le counter dans une variable pour éviter les bugs
  // qui sont généré par le compteur qui peut aller jusque l'infini
  counterSubscription: Subscription;

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyCgawzRNdekTAfLMnEk3j-sc-lwvrldyEg",
      authDomain: "http-client-angular-demo-c7ab5.firebaseapp.com",
      databaseURL: "https://http-client-angular-demo-c7ab5-default-rtdb.firebaseio.com",
      projectId: "http-client-angular-demo-c7ab5",
      storageBucket: "http-client-angular-demo-c7ab5.appspot.com",
      messagingSenderId: "3173513977",
      appId: "1:3173513977:web:ab1dbb61c045daf60f4028"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  ngOnInit() {
    // Observale est un objet qui émet des informations dans le temps
    // Ici, il émet la durée de connexion d'un user
    const counter = Observable.interval(1000);
    // subscribe() permet d'observer une Observable et de réagir à ses changements
    this.counterSubscription = counter.subscribe(
      // Information émis par l'Observable
      (value: number) => {
        this.secondes = value;
      },
      // Message d'erreur de l'Observable
      (error: any) => {
        console.log("il y a une erreur dans l'Observable counter !!")
      },
      // Message pour dire que l'Observable n'émettra plus d'information (complete) et qu'il est détruit
      () => {
        console.log("L'Observable counter est complété !!")
      }
    )
  }

  // Permet de détruite la subscription dans ngOnInit() à la fin de vie du component AppComponent
  // Et évite les problèmes de comportement infini
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
