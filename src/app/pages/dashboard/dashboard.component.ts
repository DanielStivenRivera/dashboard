import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  name = "";
  tasks: any = [];
  isCreating = false;
  displayedColumns: string[] = ["title", "description", "action"];

    
    ngOnInit() {
      this.userService.getUserProfile().subscribe(res => {
        this.name = Object.values(res)[1];
      }, err => {

      })
      this.getTasks();
    }

  constructor( private router: Router, private userService: UserService) { }


  openSidebar(e : Event) {
    const $target = (document.querySelector("#sidebarContent")) as HTMLElement ;
    $target.classList.toggle('open');
  }

  getTasks() {
    this.userService.GetUserTask().subscribe(res => {
      this.tasks = res;
    })
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
    this.isCreating = true;
    const $target = (document.querySelector("#sidebarContent")) as HTMLElement ;
    $target.classList.toggle('open');
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
