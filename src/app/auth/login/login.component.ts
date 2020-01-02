import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'u-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  message: Message;

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) {
    title.setTitle('Вход')
  }

  ngOnInit() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      this.checkLogin(user.email, user.password);
    }
    this.message = new Message('', 'danger');
    this.sub2 = this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage('Теперь вы можете войти', 'success');
        }
        if (params['notLoggedIn']) {
          this.showMessage('Необходимо войти', 'danger');
        }
      });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(text, type);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  private checkLogin(email: string, password: string) {
    this.sub1 = this.userService
      .getUsersByEmail(email)
      .subscribe((user: User) => {
        if (user[0]) {
          if (user[0].password == password) {
            this.authService.login();
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user[0]));
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage('Пароль не верный!');
          }
        } else {
          this.showMessage('Пользователь не зарегистрирован!');
        }
      });
  }

  onSubmit() {
    let formDate = this.form.value;
    this.checkLogin(formDate.email, formDate.password);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
