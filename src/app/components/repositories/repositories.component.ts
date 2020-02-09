import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../http.service";
@Component({
  selector: "app-repositories",
  templateUrl: "./repositories.component.html",
  styleUrls: ["./repositories.component.scss"]
})
export class RepositoriesComponent implements OnInit {
  // repositories: any;

  constructor(private _http: HttpService) {
    // console.log(this.repositories);
  }

  ngOnInit() {
    // this._http.getRepositories().subscribe(data => {
    //   this.repositories = data;
    //   console.log(this.repositories);
    // });
  }
}
