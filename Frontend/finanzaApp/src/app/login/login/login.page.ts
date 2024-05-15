import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public imgLogo:string = 'https://static.vecteezy.com/system/resources/previews/014/611/290/original/financial-piggy-bank-ideas-for-saving-money-for-the-future-png.png'

  constructor() { }

  ngOnInit() {
  }

}
