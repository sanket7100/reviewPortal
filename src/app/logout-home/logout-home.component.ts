import {Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-logout-home',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './logout-home.component.html',
  styleUrl: './logout-home.component.css'
})
export class LogoutHomeComponent {

  constructor(
    private router : Router,
  ){}

  join(){
    this.router.navigate(['signup']);
  }
}
