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

  stateObs = new BehaviorSubject(this.state);

  constructor(private http: HttpClient) {}

  getRepositoriesHttp(userName: string) {
    this.state.userName = userName;
    this.state.error = "";
    this.stateObs.next(this.state);
    if (userName) {
      this.state.loading = true;
      this.stateObs.next(this.state);
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
            this.stateObs.next(this.state);
          },
          err => {
            this.state.repositories = null;
            this.state.error = err.statusText;
            this.state.loading = false;
            this.stateObs.next(this.state);
          }
        );
    }
  }
}
