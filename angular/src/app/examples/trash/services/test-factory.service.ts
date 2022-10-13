import { Injectable } from '@angular/core';

export class TestFactoryService {
  constructor(private readonly name: string) {}

  go(): void {
    console.log('go!' + this.name);
  }
}
