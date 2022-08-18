import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { AuthService } from '../auth.service';
  import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  constructor(
    public utill:UtilService,
     public router: Router
     ) {

  }
  canActivate() {
    const helper = new JwtHelperService();
    this.token=localStorage.getItem('token');
    console.log(this.token);

    const isExpired = helper.isTokenExpired(JSON.parse(this.token));
    if (this.token && !isExpired) {
      return true;
    } else {
     this.utill.presentAlert('OOps!','Your Session has Expired')
      this.router.navigate(['/login']);
      return false;
    }

  }

}
