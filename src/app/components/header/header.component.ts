import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
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

  ngOnInit() {}

  getRepositoriesHttp() {
    if (this.userName) {
      this._http.getRepositoriesHttp(this.userName);
    }
  }
}
