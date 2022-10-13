import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../account/services/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  // TODO: add subject to share user status
  isLoggedIn = false;
  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.tokenService.isLoggedIn();
  }

  onLogout(): void {
    this.tokenService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['account/login']);
    return;
  }
}
