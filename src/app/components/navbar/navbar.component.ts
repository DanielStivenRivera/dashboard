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

  

  name = "Daniel Rivera";
  tasks: any = [];
  isCreating = false;
  selectedTask: string | null = "";
  displayedColumns: string[] = ["title", "description", "action"];
  editData : any = [];
  isEditing = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
    ngOnInit() {
      this.userService.getUserProfile().subscribe(res => {
        this.name = Object.values(res)[1];
      }, err => {

      })
      this.getTasks();
    }

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private userService: UserService) { }


  getTasks() {
    this.userService.GetUserTask().subscribe(res => {
      this.tasks = res;
    })
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/login");
  }


  deleteTask(event: Event) {
    const target = (event.target as HTMLElement);
    const taskId = target.getAttribute('name');
    console.log(taskId);
    this.userService.deleteTask(taskId).subscribe(res => {
      alert('task has been deleted');
      this.getTasks();
    })
  }

  addTask() {
    this.isCreating= true;
  }

  cancelTask() {
    this.isCreating = false;
  }

  createTask(form : NgForm) {
    const title = form.value.title;
    const desc = form.value.desc;
    this.userService.createtask(title, desc)
      .subscribe(res => {
        form.reset();
        this.getTasks();
        this.cancelTask();
      })
  }

}
