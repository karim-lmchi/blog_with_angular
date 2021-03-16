import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServices } from '../services/post.services';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})

// Ne pas oublier d'implémenter le onInit pour avoir accès à ngOnInit()
export class BlogViewComponent implements OnInit {

  posts = [];
  blogSubscription: Subscription;

  // Ne pas oublier d'ajouter le lien vers le PostServices pour qu'il soit accessible à l'execution du constructeur
  constructor(private postServices : PostServices) {}
  
  // Cette fonction est créer au moment de la création du component par angular et après l'exécution du constructeur
  // elle permet d'avoir les bonnes données à jours
  ngOnInit() {
    this.blogSubscription = this.postServices.postSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts;
      }
    );
    this.postServices.emitPostSubject();
  }

  onLikeAll() {
    this.postServices.switchLikeAll();
  }

  onUnlikeAll() {
    this.postServices.switchUnlikeAll();
  }

  getAllPostBlocColor() {
    if (this.posts[0].like === 1) {
      return 'lightgreen';
    } else if (this.posts[0].like === -1) {
      return 'tomato';
    } else {
      return 'white';
    }
  }

  // Pour sauvegarder les posts sur la BD
  onSave() {
    this.postServices.savePostsToServer();
  }

  // Pour récupérer les infos des posts de la BD
  onFetch() {
    this.postServices.getPostsFromServer();
  }
}
