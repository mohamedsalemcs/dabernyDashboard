import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  constructor(private route: Router, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {}
  buildForm() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      RememberMe: ['']
    });
  }

  Login(): void {
    this.submitted = true;
  }
}
