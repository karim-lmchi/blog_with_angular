import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  // FormBuilder permet de créer des formulaire plus facilement
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    // group() est une méthode qui retourne un form-group
    this.userForm = this.formBuilder.group(
      // on doit uniquement lui injecter les controls du formulaire
      // on peut y mettre des valeurs par défaut
      // Les Validators permettent d'avoir un controle sur les données, [] si on en met plusieurs
      // required = champs requis, email = check que ce soit bien un email entré ...
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        // permet d'ajouter dynamiquement des contrôles aux formulaires
        hobbies: this.formBuilder.array([])
      }
    );
  }

  onSubmitForm() {
    // value nous renvoi toutes les valeurs de control du formulaire
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['gender'],
      // hobbies étant optionel (?:), il faut d'abord vérifié qu'il existe
      formValue['hobbies'] ? formValue['hobbies'] : [],
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/user']);
  }

  // Permet de bien gérer le typage dans le tableau hobbies
  getHobbies() {
    // get permet de récupérer le contrôle des valeurs de hobbies
    // FormArray nous sert à récupérer le tableau de hobbies depuis le template
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby() {
    // on créer un nouveau control pour le formulaire au niveau des hobbies
    const newHobbyControl = this.formBuilder.control('', Validators.required);
    // Ajoute le nouvel hobby
    this.getHobbies().push(newHobbyControl);
  }

}
