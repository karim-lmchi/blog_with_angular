import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()

// Sert à centraliser du code et de la donnée utilisée dans différentes parties de l'app
export class PostServices {

    constructor(private httpClient: HttpClient) {}

    // Subject est un type d'Observable qui permet de recevoir des informations et choisir celles qui seront émises
    postSubject = new Subject<any[]>();

    // Rendre cette variable private empêche sa manipulaton et son accès depuis l'extérieur
    // Elle est accessible uniquement depuis l'intérieur du service
    private posts = [];

    // Permet d'emmettre des informations à l'extérieur du service
    emitPostSubject() {
        // next() force le subject à émettre les informations
        // slice() pour émettre une copie
        this.postSubject.next(this.posts.slice());
    }

    getPostById(id: number) {
        const post = this.posts.find(post => post.id === id);
        return post;
    }

    switchLikeAll() {
        for (let post of this.posts) {
            post.like = 1;
        }
        this.emitPostSubject();
    }

    switchUnlikeAll() {
        for (let post of this.posts) {
            post.like = -1;
        }
        this.emitPostSubject();
    }

    switchOneLike(index: number) {
        this.posts[index].like = 1;
        this.emitPostSubject();
    }

    switchOneUnlike(index: number) {
        this.posts[index].like = -1;
        this.emitPostSubject();
    }

    addPost(title: string, like: string, content: string) {
        const postObject = {
            id: 0,
            titleBloc: '',
            dateBloc : new Date(),
            blocText : '',
            like: 0,
        };
        postObject.titleBloc = title;
        postObject.like = like === 'like' ? 1 : -1;
        postObject.blocText = content;
        postObject.id = this.posts[this.posts.length - 1].id + 1;
        this.posts.push(postObject);
        this.emitPostSubject();
    }

    // Permet de sauvegarder les posts sur le serveur BD
    savePostsToServer() {
        // put prend l'url du serveur et en 2nd argument, les données à enregistrer (ici les posts)
        // contrairement à post, la méthode put permet d'écraser les données déjà présente pour cette url
        // À la fin du path on rajoute posts.json pour indiquer le path sur lequel on souhaite enregistrer les posts et .json pour indiquer que ce son des fichiers json
        // subscribe pour réagir à la réponse du serveur
        this.httpClient.put('https://http-client-angular-demo-c7ab5-default-rtdb.firebaseio.com/posts.json', this.posts)
                        .subscribe(
                            () => {
                                console.log('Enregistrement Terminé !!');
                            },
                            (error) => {
                                console.log('Erreur de sauvegarde: ', error);
                            }
                        );
    }

    // Permet de récupérer les posts du serveur BD
    getPostsFromServer() {
        // get prend en argument l'url du serveur et en 2nd argument, les données à récupérer (ici les posts)
        // <any[]> (caster) permet de dire à TS qu'on récupère un tableau et non un object (car le serveur renvoi un object)
        this.httpClient.get<any[]>('https://http-client-angular-demo-c7ab5-default-rtdb.firebaseio.com/posts.json')
                        .subscribe(
                            (response) => {
                                this.posts = response;
                                // Ne pas oublier pour voir les changements
                                this.emitPostSubject();
                            },
                            (error) => {
                                console.log('Erreur de chargement de données: ', error);
                            }
                        )
    }
}