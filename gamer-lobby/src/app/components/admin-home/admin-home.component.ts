import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(
    private adminApi: ApiService,
    private router: Router,
    private ngZone: NgZone,) { }

  ngOnInit() {
  }

  logout(){
    this.adminApi.Logout().subscribe(req => {
      this.ngZone.run(() => this.router.navigateByUrl('/guest-home'));
    });
  }

}
