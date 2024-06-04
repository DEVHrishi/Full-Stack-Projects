// user.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/User';
import { IUserLogin } from '../interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../constants/url';
import { MessageService } from 'primeng/api'; 
import { IUserRegister } from '../interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  
  constructor(private http: HttpClient, private messageService: MessageService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.showSuccessMessage('Success', 'Login successful');
        },
        error: (errorResponse) => {
          this.showErrorMessage(errorResponse.error, 'Login failed. Please try again.');
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.showSuccessMessage('Success', 'Registration successful');
        },
        error: (errorResponse) => {
          console.error(errorResponse)
          this.showErrorMessage("Error", 'Registration failed. Please try again.');
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  
  private showSuccessMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  private showErrorMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
