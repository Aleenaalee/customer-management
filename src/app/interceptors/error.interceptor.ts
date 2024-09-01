import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      console.error('An error occurred:', error);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })
  );
};
