
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MailService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Email } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { Editor, toHTML } from 'ngx-editor';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})

export class GestionComponent implements OnInit, OnDestroy {
  serveurDown:boolean
  inProgress: boolean;
  sendingProgress: boolean;
  counter: number;
  totalCount: number;
  errorMailingList: String[];
  mailIncomplet: boolean;
  editor: Editor;
  html: object;
  subject: '';

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public mailService: MailService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.editor = new Editor();

    this.mailService.getTotal()
      .subscribe({
        next: (res) => {
          this.totalCount = res;

          interval(1000).subscribe(x => {
            this.onTimeOut();
          });
        },
        error: (error) => {
          this.serveurDown = true
          console.log(error);
        }
      });


  }



  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }



  envoiMail(subject) {
    if (subject == undefined || subject.length < 5 || this.html == undefined || toHTML(this.html).length < 20) {
      this.mailIncomplet = true;
      setTimeout(() => {
        this.mailIncomplet = false;
      }, 5000);
    } else {
      let email = new Email();
      email.subject = subject;
      email.text = toHTML(this.html);
      this.mailService.sendMail(email)
        .subscribe({
          next: (data) => {

          },
          error: (error) => {
            console.log(error);
          }
        });

    }

  }


  onTimeOut() {
    this.mailService.isInProgress()
      .subscribe({
        next: (response) => {

          this.inProgress = response;
          if (response) {
            this.mailService.getRestant()
              .subscribe({
                next: (res) => {
                  this.counter = res;
                },
                error: (error) => {
                  console.log(error);
                }
              });
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }





}