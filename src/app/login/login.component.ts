import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortalServiceService } from '../portal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = "";
  password = "";
  showloginform = true;
  status1 = false;
  status2 = false;
  status3 = false;

  constructor(
    private router: Router,
    private service: PortalServiceService,
  ) { }

  gotoSingup() {
    this.router.navigate([`signup`]);
  }

  login() {
    let data = {
      "email": this.email,
      "password": this.password
    }

    this.service.login(data).subscribe(res => {
      if (res == 1) {
        this.showloginform = false;
        this.status1 = true;
        // alert(`Logged In Successfully.....`);
        this.service.getUser(this.email).subscribe(res2 => {
          setTimeout(() => {
            this.status1 = false;
            this.showloginform = true;
            localStorage.setItem(`user`, res2.username);
            localStorage.setItem(`userid`, res2.userid);
            localStorage.setItem(`useremail`, res2.useremail);
            this.service.loggedInUserid = localStorage.getItem(`userid`);
            this.service.loggedInUseremail = localStorage.getItem("useremail");
            this.service.loggedInusername = localStorage.getItem('user');
            this.router.navigate([`/items`]);
          }, 1000);
        })
      } else if (res == 2) {
        this.showloginform = false;
        this.status2 = true;
        // alert(`please Enter valid Username and Password!!!!!!`)
        setTimeout(() => {
          this.status2 = false;
          this.showloginform = true;
        }, 1000);
      } else {
        this.showloginform = false;
        this.status2 = true;
        // alert(`User does not exist........Please Signup first`);
        setTimeout(() => {
          this.status2 = false;
          this.showloginform = true;
          this.router.navigate(['signup']);
        }, 1000);
      }
    })

  }

  back() {
    this.router.navigate(['']);
  }

}
