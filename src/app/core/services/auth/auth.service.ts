import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut, user,
} from '@angular/fire/auth';
import {delay, firstValueFrom, from, map, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {IUser} from "../../../shared/interfaces/user.interface";
import {UserService} from "../user/user.service";
import {LoadingService} from "../../../shared/services/loading/loading.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any | null>;
  isSignedIn: boolean = false;
  constructor(private httpService: HttpService,
              private auth: Auth,
              private router: Router,
              private userService: UserService,
              private loadingService: LoadingService) {
    this.user$ = new Observable(user => this.auth.onAuthStateChanged(user));
  }

  emailSignup(signupInfo: IUser): Promise<any> {
    const { photoURL, username } = signupInfo;
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, signupInfo.email, signupInfo.password ?? '').then((data: any) => {
        if (data) {
          const {email, uid, emailVerified} = data.user;
          const newUser:IUser = {
            email,
            username,
            emailVerified,
            uid,
            photoURL
          }
          this.userService.saveUserInDB(newUser).then(() => {
            this.saveAccessToken(data?.user?.accessToken);
            resolve(data);
          }).catch((error) => {
            let currentUser = this.auth.currentUser;
            currentUser?.delete();
            reject(error);
          })
        }
      }).catch((error) => {
        reject(error);
      })
    })
  }

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
    this.loadingService.setLoading(true);
    signOut(this.auth).then(() => {
      setTimeout(() => {
        this.loadingService.setLoading(false);
        this.router.navigate(['/auth']);
      }, 1500);
    });
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
      tap((user: any) => {
        this.isSignedIn = !!user;
        if (this.isSignedIn) {
          this.userService.getUserFromDBByUid();
        }
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
