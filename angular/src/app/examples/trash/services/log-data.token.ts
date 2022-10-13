import { InjectionToken } from '@angular/core';
import { LogInfo } from '../models/lof-info.model';

export const LOG_DATA = new InjectionToken<LogInfo>('123');
export const NAMES = new InjectionToken<string[]>('1234');
