import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import {HomepelajarPage} from "../Homepelajar/Homepelajar";



@Component({
  selector: 'page-loginpelajar',
  templateUrl: 'loginpelajar.html'
})
export class LoginpelajarPage {

  responseData:any;
  userPelajar = { nama_pelajar: "", no_ndp: "",};

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,public authService: AuthserviceProvider) {
    this.menu.swipeEnable(false);
  }

  
  // login and go to home page
  login() {
    if (this.userPelajar.nama_pelajar && this.userPelajar.no_ndp) {
      console.log(this.userPelajar);
      this.authService.postData(this.userPelajar, "login").then(
        result => {
          this.responseData = result;
          console.log(this.responseData);
          if (this.responseData.code === 200) {
            localStorage.setItem("userPelajar", JSON.stringify(this.responseData.data));
            console.log(this.responseData.data);
            this.nav.setRoot(HomepelajarPage);
          } else {
            let alert = this.forgotCtrl.create({
              title: "Login failed!",
              subTitle: "Wrong credentials",
              buttons: ["OK"]
            });
            alert.present();
          }
        },
        err => {
          //Connection failed message
        }
      );
    } else {
      let alert = this.forgotCtrl.create({
        title: "Login failed!",
        subTitle: "Wrong credentials",
        buttons: ["OK"]
      });
      alert.present();
    }
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}

