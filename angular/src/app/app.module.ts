import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './shared/interceptors/token.interceptor';
import { ErrorInterceptor, ErrorInterceptorProvider } from './shared/interceptors/error.interceptor';
import { AnimalService } from './shared/services/animal.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    // { provide: AnimalService, useValue: { emoji: '🥳' } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
