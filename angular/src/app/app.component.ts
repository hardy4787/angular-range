import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { AnimalService } from './shared/services/animal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';

  constructor() {}
}
