import { KeyValue } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TokenInfo } from '../../../account/models/token-info.model';
import { LogInfo } from '../../trash/models/lof-info.model';
import { LOG_DATA, NAMES } from '../../trash/services/log-data.token';
import { LoggerService } from '../../trash/services/logger.service';
import { TestFactoryService } from '../../trash/services/test-factory.service';

@Component({
  selector: 'app-kek',
  templateUrl: './kek.component.html',
  styleUrls: ['./kek.component.scss'],
  providers: [
    // {
    //   provide: LoggerService,
    //   useValue: {
    //     log(message) {
    //       console.log('2');
    //     },
    //   },
    // },
    LoggerService,
    {
      provide: LOG_DATA,
      useValue: {
        id: 1,
        description: 'ta ladno',
      },
    },
    {
      provide: TestFactoryService,
      useFactory: () => new TestFactoryService('Petro'),
    },
    { provide: NAMES, useValue: 'Andrey', multi: true },
    { provide: NAMES, useValue: 'Ivan', multi: true },
  ],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class KekComponent implements OnInit {
  title = 'pipes in angular';
  user = { name: 'Rohit', age: 23 };
  nameString = '';
  employees = [
    {
      firstName: 'Rohit',
      lastName: 'Sharma',
      dept: 'Finance',
      salary: 5000,
      doj: new Date('2012-04-22'),
    },
    {
      firstName: 'Aditi',
      lastName: 'Mishra',
      dept: 'Sales',
      salary: 6000,
      doj: new Date('2016-09-16'),
    },
    {
      firstName: 'Dipti',
      lastName: 'Singh',
      dept: 'IT',
      salary: 10000,
      doj: new Date('2021-09-03'),
    },
  ];

  relationsDefinedList1 = [
    {
      key: { token: '121' },
      value: 'Brother',
    } as KeyValue<TokenInfo, string>,

    {
      key: { token: '121' },
      value: 'Sister',
    } as KeyValue<TokenInfo, string>,
  ];

  relationsDefinedList21 = new Map<number, string>([
    [1, 'Brother'],
    [1, 'Sister'],
  ]);
  relationsDefinedList22 = new Map<TokenInfo, string>();

  // Type 'TokenInfo' does not satisfy the constraint 'string | number | symbol'.ts(2344)
  relationsDefinedList3 = [
    {
      1: 'Brother',
    },
    {
      2: 'Sister',
    },
  ] as Record<number, string>[];

  constructor(
    @Inject(LOG_DATA) readonly logData: LogInfo,
    @Inject(NAMES) readonly names: string[],
    private readonly loggerService: LoggerService,
    private readonly testFactoryService: TestFactoryService,
  ) {
    console.log(logData);
  }

  ngOnInit(): void {
    this.loggerService.log('kek');
    return;
    console.log(this.logData);
    this.testFactoryService.go();
    console.log(this.names);
    this.relationsDefinedList22.set({ token: '123' } as TokenInfo, 'Brother');
    this.relationsDefinedList22.set({ token: '122' } as TokenInfo, 'Sister');
    for (let i of this.relationsDefinedList1) {
      console.log(i);
    }
    for (let i of this.relationsDefinedList22) {
      console.log(i);
    }
    for (let i of this.relationsDefinedList3) {
      console.log(i);
    }
  }

  addUser() {
    this.employees.push({
      firstName: 'Rahul',
      lastName: 'Yadav',
      dept: 'HR',
      salary: 8000,
      doj: new Date('2016-11-19'),
    });
  }

  reset() {
    this.employees = this.employees.slice();
  }
}
