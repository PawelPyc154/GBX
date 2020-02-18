import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../http.service";
@Component({
  selector: "app-repositories",
  templateUrl: "./repositories.component.html",
  styleUrls: ["./repositories.component.scss"]
})
export class RepositoriesComponent implements OnInit {
  repositories: Object[];
  error: string;
  loading: boolean;

  constructor(private _http: HttpService) {
    this._http.repositories.subscribe(repositories => {
      this.repositories = repositories;
    });
    this._http.error.subscribe(error => {
      this.error = error;
    });
    this._http.loading.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnInit() {}
}
