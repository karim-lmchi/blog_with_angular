import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
import { BlogBlocComponent } from './blog-bloc/blog-bloc.component';

import { PostServices } from './services/post.services';
import { AuthService } from './services/auth.services';
import { AuthComponent } from './auth/auth.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { RouterModule, Routes } from '@angular/router';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EditPostComponent } from './edit-post/edit-post.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user.service';
import { NewUserComponent } from './new-user/new-user.component';
import { ProfilComponent } from './profil/profil.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';

// Sert à la gestion du Routing de l'app
// path est le nom donner à la route url/path
// component est le component vers lequel la route redirige
// Ne pas oublier de bine importer tous les modules nécessaires
const appRoutes: Routes = [
  // canActivate permet de bloquer des pages si l'user n'est pas identifié
  // il prend en argument le service AuthGuard qui check la connexion de l'user
  { path: 'blogs', canActivate: [AuthGuardService], component: BlogViewComponent },
  { path: 'blogs/:id', canActivate: [AuthGuardService], component: SingleBlogComponent },
  { path: 'edit', canActivate: [AuthGuardService], component: EditPostComponent },
  { path: 'user', canActivate: [AuthGuardService], component: UserListComponent },
  { path: 'new-user', canActivate: [AuthGuardService], component: NewUserComponent },
  { path: 'profil', canActivate: [AuthGuardService], component: ProfilComponent },
  { path: 'auth/signup', component: SignUpComponent },
  { path: 'auth/signin', component: SignInComponent },
  // { path: 'auth', component: AuthComponent },
  { path: '', component: BlogViewComponent },
  // Ces 2 patch servent à gérer les erreurs 404
  // Il est important de mettre la path wild card (**) à la fin du tableau
  // car ** correspond à n'importe quelle route et donc redirige forcément
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  // Sont intégré automatiquement les components lors de leurs création
  declarations: [
    AppComponent,
    AppareilComponent,
    BlogBlocComponent,
    AuthComponent,
    BlogViewComponent,
    SingleBlogComponent,
    FourOhFourComponent,
    EditPostComponent,
    UserListComponent,
    NewUserComponent,
    ProfilComponent,
    SignInComponent,
    SignOutComponent,
    SignUpComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // sert à formulaires réactive
    ReactiveFormsModule,
    // sert à la gestion du Routing
    RouterModule.forRoot(appRoutes),
    // sert à faire le lien avec la BD (firebase)
    HttpClientModule
  ],
  // Ici il faut intégrer tous les services utilisées dans l'app
  providers: [
    PostServices,
    AuthService,
    AuthGuardService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
