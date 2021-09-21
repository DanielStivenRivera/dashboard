import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private breakpointObserver: BreakpointObserver ) {  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.userService.GetUserTask().subscribe(res => {
      console.log(res);
    }, err => {

    })
  }

  logout() {
    console.log('logout');
    localStorage.removeItem('access_token');
    window.location.reload();
  }

  payload() {
    this.userService.GetUserTask();
  }

  createTask(form: NgForm) {
    this.userService.createtask(form.value.title, form.value.description)
      .subscribe(res => {
        alert("task has been created")
      },
      err => {
        alert("cant be create task")
      }
      )
  }

}
