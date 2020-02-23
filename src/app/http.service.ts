import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, BehaviorSubject } from "rxjs";
import { httpState } from "./models/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private state: httpState = {
    userName: "",
    repositories: null,
    error: "",
    loading: false
  };

  private state$ = new BehaviorSubject(this.state);

  constructor(private http: HttpClient) {}

  getRepositoriesHttp(userName: string) {
    this.state.userName = userName;
    this.state.error = "";
    this.state$.next(this.state);
    if (userName) {
      this.state.loading = true;
      this.state$.next(this.state);
      return this.http
        .get<Array<any>>(
          `https://api.github.com/users/${this.state.userName}/repos`
        )
        .subscribe(
          (data: any[]) => {
            this.state.repositories = data.sort(
              (a, b) =>
                new Date(a.updated_at).getTime() -
                new Date(b.updated_at).getTime()
            );
            this.state.userName = "";
            this.state.loading = false;
            this.state$.next(this.state);
          },
          err => {
            this.state.repositories = null;
            this.state.error = err.statusText;
            this.state.loading = false;
            this.state$.next(this.state);
          }
        );
    }
  }

  getState(): Observable<httpState> {
    return this.state$.asObservable();
  }
}
