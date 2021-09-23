import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskDTO } from '../models/TaskDTO';
import { CreateUserDTO } from '../models/user.model';
import { JwtHelperService }  from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URI = "https://nest-dashboard.herokuapp.com/";

  constructor(private http: HttpClient, private router: Router) { }

  login(userData : any) {
    return this.http.post(this.URI + 'user/login', userData);
  }

  register(createUserDTO: CreateUserDTO) {
    return this.http.post(this.URI + "user/register", createUserDTO);
  }

  //return false if the token has expired
  isExpired() {
    var token : any;
    token = localStorage.getItem('access_token');
    const jwtService = new JwtHelperService();
    return jwtService.isTokenExpired(token);
  }

  getUserProfile() {
    const token = localStorage.getItem('access_token');
    return this.http.get(this.URI + 'profile/' + this.getIdFromToken(), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('login');
  }

  getTask(id: any) {
    const token = localStorage.getItem('access_token');
    return this.http.get(this.URI + 'task/' + id, {headers: {
      'Authorization': 'Bearer ' + token
    }})
  }

  GetUserTask() {
    const id = this.getIdFromToken();
    var token: any;
    token = localStorage.getItem('access_token');
     return this.http.get(this.URI+'profile/' + id + '/tasks', {
       headers: {
        'Authorization': 'Bearer ' + token
       }
     });
  }

  createtask(title: string, desc: string) {
    var token: any;
    token = localStorage.getItem('access_token');
    const id = this.getIdFromToken();
    return this.http.post(this.URI + 'task/create', {userId: id, title, description: desc}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }

  deleteTask(id: any) {
    const token = localStorage.getItem('access_token');
    return this.http.delete(this.URI + 'tasks/' + id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  updateTask(title: string, desc: string) {
    const token = localStorage.getItem('access_token');
    
  }

  private getIdFromToken() {
    const jwtService = new JwtHelperService();
    var token: any;
    token = localStorage.getItem('access_token');
    const {id} = jwtService.decodeToken(token);
    return id;
  }



}
