import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../account/models/login-request.model';
import { IdentityService } from '../account/services/identity.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SignupRequest } from '../account/models/signup-request.model';
import { TokenService } from '../account/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  // TODO: add subject to share user status
  isLoggedIn = false;
  constructor(private readonly tokenService: TokenService, private readonly router: Router) {}

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
