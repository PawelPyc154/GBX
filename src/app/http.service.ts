import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private userName = new BehaviorSubject<string>("");
  private repositories = new BehaviorSubject<Object[]>(null);
  private error = new BehaviorSubject<string>("");
  private loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getRepositoriesHttp(userName: string) {
    this.userName.next(userName);
    this.error.next("");
    if (this.userName) {
      this.loading.next(true);
      return this.http
        .get<Array<any>>(
          `https://api.github.com/users/${this.userName.value}/repos`
        )
        .subscribe(
          (data: any[]) => {
            this.repositories.next(
              data.sort(
                (a, b) =>
                  new Date(a.updated_at).getTime() -
                  new Date(b.updated_at).getTime()
              )
            );
            this.userName.next("");
            this.loading.next(false);
          },
          err => {
            this.repositories.next(null);
            this.error.next(err.statusText);
            this.loading.next(false);
          }
        );
    } else {
      this.repositories.next(null);
      this.userName.next("");
    }
  }

  getUserNameObs(): Observable<string> {
    return this.userName.asObservable();
  }
  getRepositoriesObs(): Observable<Object[]> {
    return this.repositories.asObservable();
  }
  getErrorObs(): Observable<string> {
    return this.error.asObservable();
  }
  getLoadingObs(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
