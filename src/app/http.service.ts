import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private state = {
    userName: "",
    repositories: null,
    error: "",
    loading: false
  };
  stateObs: Observable<any> = of(this.state);

  constructor(private http: HttpClient) {}

  getRepositoriesHttp(userName: string) {
    this.state.userName = userName;
    this.state.error = "";
    if (userName) {
      this.state.loading = true;
      return this.http
        .get<Array<any>>(`https://api.github.com/users/${userName}/repos`)
        .subscribe(
          (data: any[]) => {
            this.state.repositories = data.sort(
              (a, b) =>
                new Date(a.updated_at).getTime() -
                new Date(b.updated_at).getTime()
            );
            this.state.userName = "";
            this.state.loading = false;
          },
          err => {
            this.state.repositories = null;
            this.state.error = err.statusText;
            this.state.loading = false;
          }
        );
    }
  }
}
