import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName = '';
  error: string;
  loading: boolean;

  constructor(private _http: HttpService) {
    this._http.getState().subscribe(state => {
      this.userName = state.userName;
      this.error = state.error;
      this.loading = state.loading;
    });
  }

  ngOnInit() {}

  getRepositoriesHttp() {
    this._http.getRepositoriesHttp(this.userName);
  }
}
