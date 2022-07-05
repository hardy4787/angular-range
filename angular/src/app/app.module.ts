import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './shared/interceptors/token.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthInterceptorProvider, ErrorInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule {}
