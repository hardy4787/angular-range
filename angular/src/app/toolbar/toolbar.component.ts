import { Component, OnInit } from '@angular/core';
import { LoginRequest } from './models/login-request.model';
import { LoginService } from './services/login.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  isUserLogged: boolean;

  constructor(
    private readonly loginService: LoginService,
    private readonly dialog: MatDialog
  ) {}

  onOpenLoginDialog(): void {
    this.dialog
      .open(LoginDialogComponent)
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
        switchMap((dialogResult: LoginRequest) =>
          this.loginService.login$(dialogResult).pipe(
            tap((response) => {
              sessionStorage.setItem('tokenKey', response.accessToken);
              this.isUserLogged = true;
            })
          )
        )
      )
      .subscribe();
  }

  onLogout(): void {
    sessionStorage.removeItem('tokenKey');
    this.isUserLogged = false;
  }
}
