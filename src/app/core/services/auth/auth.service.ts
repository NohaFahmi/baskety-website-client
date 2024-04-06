import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut, user,
} from '@angular/fire/auth';
import {map, Observable, of, tap} from "rxjs";
import firebase from "firebase/compat";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any | null>;
  isSignedIn: boolean = false;
  constructor(private httpService: HttpService,
              private auth: Auth, private router: Router) {
    this.user$ = new Observable(user => this.auth.onAuthStateChanged(user));
  }

  emailSignup(signupInfo: any): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, signupInfo.email, signupInfo.password);
  }

  // createUserInDB(userInfo: IUserInfo): Promise<any> {
  //   return this.httpService.post('users/create', {
  //     uid: userInfo.uid,
  //     email: userInfo.email,
  //     username: userInfo.displayName,
  //     photoURL: userInfo.photoURL,
  //     emailVerified: userInfo.emailVerified
  //   })
  // }

  // getUserByUUID(user: IUserInfo): Observable<any> {
  //   return this.httpService.get(`users/getById/${user.uid}`);
  // }
  //
  // updateUserInDB(userInfo: IUserInfo): Observable<any> {
  //   return this.httpService.put(`users/update`, userInfo);
  // }

  loginWithEmail(loginInfo: any): Promise<any> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, loginInfo.email, loginInfo.password).then((data : any) => {
        this.saveAccessToken(data?.user?.accessToken);
        resolve(data);
      }).catch((err) => {
        this.saveAccessToken('');
        reject(err)
      });
    })
  }

  logoutUser(): void {
    signOut(this.auth).then(() => {
      this.router.navigate(['/auth']);
    })
  }

  loginWithGoogle(): Promise<any> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  saveAccessToken(value: string) {
    localStorage.setItem('token', value);
  }

  getAccessToken(): string {
    return localStorage.getItem('token') || '';
  }
  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      tap(user => {
        console.log('USER', user);
      this.isSignedIn = !!user;
      return !!user;
    }));
  }

  // sendVerificationEmail() {
  //   return this.auth.currentUser.then((user) =>
  //     user?.sendEmailVerification());
  // }
  // setUserInfo(user: IUserInfo | null) {
  //   console.log("SEEET", user);
  // }

  // getUserRefreshToken(): Observable<any> {
  //   return new Observable((observer) => {
  //     // onAuthStateChanged(this.auth,user => {
  //     //   // this.userInfo.next(user as IUserInfo);
  //     //   observer.next(user);
  //     //   if (user) {
  //     //     this.store.dispatch(AuthorizationActions.setUserInfo({ userInfo: user as IUserInfo }));
  //     //     console.log("USER", user.refreshToken);
  //     //   } else {
  //     //     this.store.dispatch(AuthorizationActions.logout());
  //     //     console.log("USER", 'sign out');
  //     //   }
  //     // })
  //   })
  // }


}
