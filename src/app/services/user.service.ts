import { Subject } from 'rxjs';
import { User } from '../models/user.model';

export class UserService {

    private users: User[] = [
        {
            firstName: 'Karim',
            lastName: 'Lmchi',
            email: 'karim@lmchi.com',
            gender: 'Male',
            hobbies: ['Football', 'Boxe', 'Basket', 'Natation']
        },
    ];
    userSubject = new Subject<User[]>();
    
    // Cette méthode émet une copie du tableau users
    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user);
        this.emitUsers();
    }
}