import { Injectable } from "@angular/core";

@Injectable()
export class BetterLoggerService {
  log(message: string): void {
    console.log(message + 1);
  }
}
