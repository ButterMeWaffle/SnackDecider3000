import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Snack } from '../../models/snack.model';
import { HttpService } from '../../services/http.service'
import { ErrorSnackComponent } from '../../components/error-snack/error-snack.component'
import { ErrorVotesComponent } from '../../components/error-votes/error-votes.component'
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie';
import { NgxSpinnerService } from "ngx-spinner";
import { trigger, state, style, animate, transition, AUTO_STYLE } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('collapse', [
      state('false', style({
        height: AUTO_STYLE,
        visibility: AUTO_STYLE
      })),
      state('true', style({
        height: '0',
        visibility: 'hidden'
      })),
      transition('false => true', animate('500ms ease-in')),
      transition('true => false', animate('500ms ease-out'))
    ])
  ]

})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpServ: HttpService, private snackBar: MatSnackBar, private cookieService: CookieService, private spinner: NgxSpinnerService) { }

  public SelectedSnacks: Array<Snack> = this.getVotedSnacksCookie();
  public Snacks: Array<Snack> = [];
  public MaxVotes: number = 3;
  public breakpoint: number = 3;
  public collapse: boolean = false;

  ngOnInit(): void {
    this.spinner.show();
    this.getSnacks();
    this.setBreakPoint(window.innerWidth);
    this.MaxVotes = 3;
  }

  //handle our mobile menu collapse
  toggleCollapse(): void {
    this.collapse = !this.collapse;
  }

  //nice smooth scroll 
  scroll(el: HTMLElement): void  {
    el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  // using http get our snack list
  getSnacks = () => {
    this.httpServ.HttpGet("snacks").subscribe((data: any) => { // it didnt like me casting to Array<Snack> here so I stuck with any
      this.Snacks = data;
      this.Snacks.sort(function (a, b) { return a.votes - b.votes; }).reverse()
      this.spinner.hide();
    },
      err => {
        // for the sake of saving dev time I will do a blanket cover for all errors in just one message. In a real world situation it would be best to log the error to the DB
        this.ShowGeneralError();
        this.spinner.hide();
      }
    )

  }

  // vote on a snack, tell the backend the vote, save the voted on snacks to cookies
  SelectSnack = (SelSnack: Snack) => {
    if (this.SelectedSnacks.indexOf(SelSnack) == -1 && this.SelectedSnacks.length < 3) {
      this.httpServ.HttpPost('snacks/vote/' + SelSnack.id).subscribe((data: any) => { // it didnt like me casting to Array<Snack> here so I stuck with any
        if (data.id == SelSnack.id) {
          //update the value held in snacks and push tp selectedsnacks
          this.Snacks[this.Snacks.indexOf(SelSnack)] = data
          this.SelectedSnacks.push(data);
          //re-sort the data
          this.Snacks.sort(function (a, b) { return a.votes - b.votes; }).reverse()
          this.SelectedSnacks.sort(function (a, b) {
            var textA = a.product.toUpperCase();
            var textB = b.product.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          });
          this.setVotedSnacksCookie();
        } else {
          //something went wrong
          this.ShowGeneralError();
        }
      })
    } else {
      this.snackBar.openFromComponent(ErrorVotesComponent, {
        duration: 5000,
      });
    }
  }

  // adjust our mat-grid-tile on screen resize
  onResize(event: any) {
    this.setBreakPoint(event.target.innerWidth);
  }

  setBreakPoint(Width: number) {
    if (Width <= 580) {
      this.breakpoint = 1
    }else if (Width <= 996) {
      this.breakpoint = 2
    } else {
      this.breakpoint = 3
    }
  }

  getVotedSnacksCookie() {
    let Cookie: any = this.cookieService.get("VotedSnacks")
    if (Cookie) {
      return JSON.parse(Cookie);
    } else {
      var now = new Date();
      this.cookieService.put("VotedSnacks", "", { expires: new Date(now.getFullYear(), now.getMonth() + 1, 0) });
      return [];
    }

  }

  setVotedSnacksCookie() {
    var now = new Date();
    this.cookieService.put("VotedSnacks", JSON.stringify(this.SelectedSnacks), { expires: new Date(now.getFullYear(), now.getMonth() + 1, 0) });
  }

  ShowGeneralError() {
    this.snackBar.openFromComponent(ErrorSnackComponent, {
      duration: 5000,
    });
  }
}

