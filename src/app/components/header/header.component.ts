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
    this._http.error.subscribe((error: string) => {
      this.error = error;
    });
    this._http.loading.subscribe((loading: boolean) => {
      this.loading = loading;
    });

    this._http.userName.subscribe((userName: string) => {
      this.userName = userName;
    });
  }

  ngOnInit() {}

  getRepositoriesHttp() {
    this._http.userName.next(this.userName);
    this._http.getRepositoriesHttp();
  }
}
