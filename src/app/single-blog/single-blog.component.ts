import { Component, OnInit } from '@angular/core';
import { PostServices } from '../services/post.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {

  title: string = "Post";
  text: string = "Text";

  // ActivatedRoute permet de gérer les routes dynamiques (:id)
  // Elle contient toutes les informations de la route active et de son fragment
  constructor(private postServices: PostServices, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // snpashot permet d'avoir les infos du moment même de l'url
    // params permet de recupérer les paramètres souhaités dans l'url
    const id = this.route.snapshot.params['id'];
    // le '+' devant id est pour le convertir de string en number
    this.title = this.postServices.getPostById(+id).titleBloc;
    this.text = this.postServices.getPostById(+id).blocText;
  }

}
