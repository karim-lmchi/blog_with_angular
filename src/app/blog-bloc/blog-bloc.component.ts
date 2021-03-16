import { Component, Input, OnInit } from '@angular/core';
import { PostServices } from '../services/post.services';

@Component({
  selector: 'app-blog-bloc',
  templateUrl: './blog-bloc.component.html',
  styleUrls: ['./blog-bloc.component.scss']
})
export class BlogBlocComponent implements OnInit {

  // Propiétés personnalisés
  // Permettent de passer des données du parent à l'enfant
  @Input() titleBloc: string;
  @Input() blocText: string;
  @Input() like: number;
  @Input() create_at: Date;
  @Input() postIndex: number;
  @Input() id: number;

  constructor(private postServices : PostServices) {
    this.create_at = new Date();
   }

  ngOnInit(): void {
  }

  onLike() {
    this.postServices.switchOneLike(this.postIndex);
  }

  onUnlike() {
    this.postServices.switchOneUnlike(this.postIndex);
  }

  getBlocColor() {
    if (this.like === 1) {
      return 'lightgreen';
    } else if (this.like === -1) {
      return 'tomato';
    } else {
      return 'white';
    }
  }

}
