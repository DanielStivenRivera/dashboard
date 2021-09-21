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

  registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

    this.registerForm = formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.email, Validators.required],
      password: ['', Validators.required]
    })

   }

   user = new CreateUserDTO();

  ngOnInit(): void {
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
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
