import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, NgForm } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  

  
  isEditing = false;

    
    ngOnInit() {
      
    }

  constructor( private router: Router, private userService: UserService) { }


  toggle(e: Event) {
    const burger = e.target as HTMLElement;
    const target: any = burger.dataset.target;
    const $target = (document.querySelector('#'+ target)) as HTMLElement ;
    $target.classList.toggle('is-active'); 
  }

  logout() {
    this.userService.logout();
  }

  

}
