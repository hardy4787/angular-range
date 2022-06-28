import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: any; // 'events' | 'body' | 'response'
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
  body?: any;
}

export interface RequestOptions {
  httpOptions?: HttpOptions;
  showErrorToast?: boolean;
  allowStringData?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceHelper {
  constructor(
    private readonly http: HttpClient,
    private readonly toastrService: ToastrService
  ) {}

  get$<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.executeRequest$<T>('get', url, null, options);
  }

  post$<T>(url: string, data: any, options?: RequestOptions): Observable<T> {
    return this.executeRequest$<T>('post', url, data, options);
  }

  put$<T>(url: string, data: any, options?: RequestOptions): Observable<T> {
    return this.executeRequest$<T>('put', url, data, options);
  }

  patch$<T>(url: string, data: any, options?: RequestOptions): Observable<T> {
    return this.executeRequest$<T>('patch', url, data, options);
  }

  delete$<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.executeRequest$<T>('delete', url, null, options);
  }

  private executeRequest$<T>(
    method: string,
    url: string,
    data: any,
    options?: RequestOptions
  ) {
    const defaultOptions = this.setupDefaultRoutingOptions(options);
    const httpOptions = this.createRequestOptions(data, defaultOptions);
    return this.http
      .request<T>(method, environment.apiUrl + url, httpOptions)
      .pipe(
        catchError((error: unknown) => {
          this.errorHandling(error as HttpErrorResponse, defaultOptions);
          return throwError(() => error);
        })
      );
  }

  private readonly createRequestOptions = <T>(
    data: any,
    requestOptions: RequestOptions
  ): HttpOptions => {
    const { httpOptions } = requestOptions;
    // Resolve default values
    if (httpOptions.responseType === undefined) {
      httpOptions.responseType = 'json';
    }

    if (data !== null) {
      if (typeof data === 'string') {
        if (requestOptions.allowStringData) {
          httpOptions.body = JSON.stringify(data);
          httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });
        } else {
          httpOptions.body = { value: data };
        }
      } else {
        httpOptions.body = data;
      }
    }

    return httpOptions;
  };

  private errorHandling(
    error: HttpErrorResponse,
    options: RequestOptions
  ): void {
    if (options.showErrorToast) {
      this.toastrService.error(this.getDefaultMessage(error.status));
    } else {
      console.log(error);
    }
  }

  private readonly setupDefaultRoutingOptions = (
    routingOpts: RequestOptions = {
      httpOptions: {},
    }
  ) => {
    if (routingOpts.showErrorToast === undefined) {
      return { ...routingOpts, showErrorToast: true };
    }

    return routingOpts;
  };

  private readonly getDefaultMessage = (statusCode: number) => {
    switch (statusCode) {
      case HttpStatusCode.BadRequest:
        return 'The request could not be understood by the server.';
      case HttpStatusCode.Unauthorized:
        return 'The request requires user authentication. Please log in again.';
      case HttpStatusCode.Forbidden:
        return 'Insufficient security rights';
      case HttpStatusCode.NotFound:
        return 'The server has not found anything matching the request.';
      default:
        return 'The server encountered an unexpected error.';
    }
  };
}
