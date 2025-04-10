import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    const newReq= req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    });
    return next(newReq);

    }


  return next(req);
};
