import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class HttpService {
  userName: string = "";
  repositories: Object[];
  error: string;
  loading: boolean = false;
  constructor(private http: HttpClient) {}

  getRepositories(): Observable<any> {
    this.error = "";

    if (this.userName) {
      this.loading = true;

      return of(
        this.http
          .get(`https://api.github.com/users/${this.userName}/repos`)
          .subscribe(
            (data: any[]) => {
              this.repositories = data.sort(
                (a, b) =>
                  new Date(a.updated_at).getTime() -
                  new Date(b.updated_at).getTime()
              );
              this.userName = "";

              this.loading = false;
            },
            err => {
              this.repositories = null;

              this.error = err.statusText;

              this.loading = false;
            }
          )
      );
    } else {
      this.repositories = null;
      this.userName = "";
    }
  }
}
