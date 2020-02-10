import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private userName: string = "";
  private repositories: Object[] | null;
  private error: string;
  private loading: boolean = false;
  private userNameObs = new BehaviorSubject<string>("");
  private repositoriesObs = new BehaviorSubject<Object[]>(null);
  private errorObs = new BehaviorSubject<string>("");
  private loadingObs = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  getRepositoriesHttp(userName: string) {
    
    this.userName = userName;
    this.userNameObs.next(this.userName);

    this.error = "";
    this.errorObs.next(this.error);
    if (this.userName) {
      this.loading = true;
      this.loadingObs.next(this.loading);
      return this.http
        .get(`https://api.github.com/users/${this.userName}/repos`)
        .subscribe(
          (data: any[]) => {
            this.repositories = data.sort(
              (a, b) =>
                new Date(a.updated_at).getTime() -
                new Date(b.updated_at).getTime()
            );
            this.repositoriesObs.next(this.repositories);

            this.userName = "";
            this.userNameObs.next(this.userName);
            this.loading = false;
            this.loadingObs.next(this.loading);
          },
          err => {
            this.repositories = null;
            this.repositoriesObs.next(this.repositories);
            this.error = err.statusText;
            this.errorObs.next(this.error);
            this.loading = false;
            this.loadingObs.next(this.loading);
          }
        );
    } else {
      this.repositories = null;
      this.repositoriesObs.next(this.repositories);
      this.userName = "";
      this.userNameObs.next(this.userName);
    }
  }

  getUserNameObs(): Observable<string> {
    return this.userNameObs.asObservable();
  }
  getRepositoriesObs(): Observable<Object[]> {
    return this.repositoriesObs.asObservable();
  }
  getErrorObs(): Observable<string> {
    return this.errorObs.asObservable();
  }
  getLoadingObs(): Observable<boolean> {
    return this.loadingObs.asObservable();
  }
}
