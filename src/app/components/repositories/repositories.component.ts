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
    this._http.stateObs.subscribe(state => {
      console.log(state);

      this.repositories = state.repositories;
      this.error = state.error;
      this.loading = state.loading;
    });
  }

  ngOnInit() {}
}
