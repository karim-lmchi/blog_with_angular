import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.services";
import { Router } from '@angular/router';
import firebase from 'firebase';

// on a besoin du service authService, on doit injecter un service dans un autre service
@Injectable()

// Ce service sert à protéger les routes de l'app
// On souhaite qu'un user non connécté ne puisse pas naviguer dans l'app
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    // cette méthode a une forme qu'oblige l'interphase CanActivate
    canActivate() : Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if(user) {
                            resolve(true);
                        } else {
                            this.router.navigate(['/auth', 'signin']);
                            resolve(false);
                        }
                    }
                )
            }
        )
    }
}