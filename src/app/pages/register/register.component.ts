import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { CreateUserDTO } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  

  constructor(private userService: UserService, private router: Router) {

  

   }

   user = new CreateUserDTO();

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


  register(form: NgForm) {
    const fullName = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    if(!fullName || !email || !password) {
      alert('completar formulario de registro');
    }
    else {
      const createUserDTO = new CreateUserDTO();
      createUserDTO.email = form.value.email;
      createUserDTO.fullName = form.value.name;
      createUserDTO.password = form.value.password;
      console.log(createUserDTO)
      this.userService.register(createUserDTO).subscribe(res => {
        alert('registro exitoso');
        this.router.navigateByUrl('/login');
      }, err => {
        console.log(err.status)
        
          alert('el correo ya se encuentra registrado');
          form.reset();
        
      })
    }
  }

}
