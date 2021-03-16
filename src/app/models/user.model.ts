export class User {

    // public est un raccourci TS qui permet de créer les propriétés de cette manière sans avoir à les créer de manière traditionnelle
    // ?: indique c'est optionnel
    constructor( public firstName: string,
                public lastName: string,
                public email: string,
                public gender: string,
                public hobbies?: string[]) {}
}