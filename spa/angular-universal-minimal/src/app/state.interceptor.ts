import { isPlatformServer } from '@angular/common';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private transferState: TransferState
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (isPlatformServer(this.platformId)) {
      return next.handle(req).pipe(
        tap((event: any) => {
          if (event instanceof HttpResponse) {
            this.transferState.set(makeStateKey(req.url), event.body);
          }
        })
      );
    } else {
      if (req.method !== 'GET') {
        return next.handle(req);
      }

      const storedRes: string | null = this.transferState.get(
        makeStateKey(req.url),
        null
      );

      if (storedRes) {
        const res = new HttpResponse({
          body: storedRes,
          status: 200,
        });
        return of(res);
      }

      return next.handle(req);
    }
  }
}
