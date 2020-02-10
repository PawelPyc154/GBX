import { HttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RepositoriesComponent } from "./components/repositories/repositories.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LoaderComponent } from "./components/loader/loader.component";
import { SimplebarAngularModule } from "simplebar-angular";

@NgModule({
  declarations: [AppComponent, RepositoriesComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SimplebarAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
