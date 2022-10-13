import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AnimalService } from '../shared/services/animal.service';
import { Employee } from './models/employee';

type type1 = 'newPerson' | 'existingPerson';
type type2 = [number, string];
@Component({
  selector: 'app-examples-page',
  templateUrl: './examples-page.component.html',
  styleUrls: ['./examples-page.component.scss'],
})
export class ExamplesPageComponent {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    const kek: Employee = {
      id: 1,
      name: 'lol',
      salary: 1200,
    };
    const kek1: type1 = 'newPerson';
    const subject1$ = new BehaviorSubject(0);
    subject1$.next(1); // в консоли: 1
    subject1$.subscribe((x) => console.log(x)); // в консоли: 0
    subject1$.next(2); // в консоли: 2
    console.log(subject1$.getValue()); // в консоли: 2
    subject1$.subscribe((x) => console.log(x)); // в консоли: 2
    subject1$.complete();
  }

  backToMainMenu(): void {
    this.router.navigateByUrl('/');
  }
}
