import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() authStatus: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn() {
    // On rajoute le .then pck signIn() est une promesse
    this.authService.signIn().then(
      () => {
        this.authStatus = this.authService.isAuth;
        // navigate() est une instance du service Router qui prend en argument un tableau de routes
        this.router.navigate(['blogs']);
      }
    )
  };

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  };

}
