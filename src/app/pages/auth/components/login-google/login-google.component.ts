import { Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CredentialResponse, PromptMomentNotification } from "google-one-tap";
import { ApiResponse } from "src/app/commons/response.interface";
import { environment } from "src/environments/environment";

declare var window: any;
declare var google: any;

@Component({
  selector: "app-login-google",
  templateUrl: "./login-google.component.html",
  styleUrls: ["./login-google.component.scss"],
})
export class LoginGoogleComponent implements OnInit {
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {}

  private client_id=environment.client_id;

  ngOnInit(): void {
    window.onGoogleLibraryLoad = () => {
      google.accounts.id.initialize({
        client_id: this.client_id,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: false,
      });
      google.accounts.id.renderButton(document.getElementById("buttonGoogle"), {
        theme: "filled_blue",
        type: "standard",
        size: "large",
        text: "continue_with",
        shape: "square",
        widht: 300,
      });
      google.accounts.id.prompt((motification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    this.authService.loginWithGoogle(response.credential,"Externo").subscribe(
      (resp: ApiResponse) => {
        if (resp.isSuccess) {
          this.ngZone.run(() => {
            this.router.navigate(["/"]);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
