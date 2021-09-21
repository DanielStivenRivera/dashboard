import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly userService: UserService, private router: Router, private formBuilder : FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['']
    })
  }

  loginForm: FormGroup;

  ngOnInit(): void {
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
