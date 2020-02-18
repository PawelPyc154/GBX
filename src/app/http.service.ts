import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  public userName = new BehaviorSubject<string>("");
  public repositories = new BehaviorSubject<Object[]>(null);
  public error = new BehaviorSubject<string>("");
  public loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getRepositoriesHttp() {
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
}
