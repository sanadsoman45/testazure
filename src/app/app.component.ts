import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angularazuretest';

  isLoggedin():boolean{
    //check whether any user account is logged in or not.
    return this.msalService.instance.getActiveAccount()!=null;
  }


  constructor(private msalService: MsalService) {
    
  }

  //function to login:
  login(){
    this.msalService.loginPopup().subscribe({
      next:(response:AuthenticationResult)=>{
        //login attempt success? set account as active or will be null.
        this.msalService.instance.setActiveAccount(response.account);
      },
      error:(error)=>{
        // in case of error occured.
        console.log(`Error has occured: ${error}`);
      },
      complete:()=>{
        console.log("Success!");
      }
    })
  }

  logout(){
    //logging out the user.
    this.msalService.logout();
  }
}
