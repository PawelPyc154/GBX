import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../http.service";
@Component({
  selector: "app-repositories",
  templateUrl: "./repositories.component.html",
  styleUrls: ["./repositories.component.scss"]
})
export class RepositoriesComponent implements OnInit {
  constructor(private _http: HttpService) {}

  ngOnInit() {}
}
