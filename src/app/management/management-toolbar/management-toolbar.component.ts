import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../management.service';
import {Router} from '@angular/router';
import {LoggedUser} from '../management-models';

@Component({
  selector: 'app-management-toolbar',
  templateUrl: './management-toolbar.component.html',
  styleUrls: ['./management-toolbar.component.css']
})
export class ManagementToolbarComponent implements OnInit {
  loggedUser: LoggedUser;

  constructor(private router: Router, private managementService: ManagementService) {
    this.loggedUser = managementService.getLoggedUser();
  }

  ngOnInit() {
  }

  logout() {
    this.managementService.logout().subscribe(_ => this.router.navigate([`management/login`]));
  }
}
