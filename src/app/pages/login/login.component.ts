import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly userService: UserService, private router: Router) { 
    
  }

  ngOnInit(): void {
     const access_token = localStorage.getItem('access_token');
     if(access_token != null) {
       if(this.userService.isExpired()) {
         localStorage.removeItem('access_token');
       }
       else {
         this.router.navigateByUrl('/dashboard');
       }
     }
  }

  async login(form: NgForm) {
    if(!form.value.email || !form.value.password) {
      alert("completar el formulario");
    }
    else {
      const userData = {
        email: form.value.email,
        password: form.value.password
      }
      this.userService.login(userData).subscribe(res => {
        console.log(res);
        const token = Object.values(res);
        localStorage.setItem('access_token', token[0]);
        this.router.navigateByUrl('/dashboard');
      }, err => {
        alert('correo o contraseña incorrectos');
        form.reset();
      })
      
    }
    
  }

}
