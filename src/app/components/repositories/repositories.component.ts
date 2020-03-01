import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  repositories: any;
  error: string;
  loading: boolean;

  constructor(private _http: HttpService) {
    this._http.getState().subscribe(state => {
      this.repositories = state.repositories;
      this.error = state.error;
      this.loading = state.loading;
    });
  }

  ngOnInit() {}
}
