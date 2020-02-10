import { Component, OnInit } from "@angular/core";
import { HttpService } from "./http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  userName: string = "";
  error: string;
  loading: boolean;

  constructor(private _http: HttpService) {
    this._http.getErrorObs().subscribe((error: string) => {
      this.error = error;
    });
    this._http.getLoadingObs().subscribe((loading: boolean) => {
      this.loading = loading;
    });

    this._http.getUserNameObs().subscribe((userName: string) => {
      this.userName = userName;
    });
  }

  ngOnInit(): void {}

  getRepositoriesHttp() {
    this._http.getRepositoriesHttp(this.userName);
  }
}
