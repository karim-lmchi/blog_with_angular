import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostServices } from '../services/post.services';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor(private postServices: PostServices,
              private router: Router) { }

  ngOnInit(): void {
  }

  // Permet de mettre par défaut sur la value Like dans l'edit d'un post
  defaultOnLike = "like";

  // Cette méthode permet d'envoyer et de stocker les informations misent deans le formulaire d'édition
  // On a indiqué dans le template que la méthode recoit pour paramètre un objet de type NgForm
  onSubmit(form: NgForm) {
    // dans value, indiqué le nom de l'id de la balise html
    const title = form.value['title'];
    const like = form.value['like'];
    const content = form.value['content'];
    this.postServices.addPost(title, like, content);
    // On redirige après l'envoi du formulaire vers une autre page de l'app
    this.router.navigate(['blogs']);
  }

}
