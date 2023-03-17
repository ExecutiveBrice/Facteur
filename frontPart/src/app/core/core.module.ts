import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "../app-routing.module";
import { FormsModule } from "@angular/forms";
import { MailService } from "../services";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestionComponent } from "../pages";
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    NgxEditorModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    MailService
  ],
  declarations: [
    GestionComponent

  ]
})
export class CoreModule { }
